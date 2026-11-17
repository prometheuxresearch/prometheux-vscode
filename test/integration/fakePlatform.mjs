// A proxy in front of a real backend for the integration tests. It forwards
// every request (and WebSocket upgrade) unchanged, except the compute pool
// machine endpoints, which it fakes so starting a machine costs nothing. It
// records the `compute` field of forwarded JSON bodies; the suite reads them
// from GET /__test/requests.
import http from "node:http";
import net from "node:net";

const MACHINES = [
  { id: "um-running", status: "Enabled", for_compute: true, machines: { id: "cat-running", name: "PX_4_16_GP", cores: 4, memory_gb: 16 } },
  { id: "um-stopped", status: "Enabled", for_compute: true, machines: { id: "cat-stopped", name: "PX_8_32_GP", cores: 8, memory_gb: 32 } },
  { id: "um-disabled", status: "Disabled", for_compute: true, machines: { id: "cat-disabled", name: "PX_OFF", cores: 2, memory_gb: 8 } },
];

export async function startFakePlatform(target) {
  const upstream = new URL(target);
  const states = { "um-running": { machine_status: "started", is_active: true }, "um-stopped": { machine_status: "stopped", is_active: false } };
  const recorded = [];
  const json = (res, status, body) => {
    res.writeHead(status, { "content-type": "application/json" });
    res.end(JSON.stringify(body));
  };

  const server = http.createServer(async (req, res) => {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = Buffer.concat(chunks);
    const path = req.url.replace(/^\/+/, "/");

    if (path === "/__test/requests") return json(res, 200, recorded);
    if (path.endsWith("/machines/machines-combined")) {
      return json(res, 200, { status: "success", data: { machines: [], user_machines_enabled: MACHINES, user_machines_disabled: [] } });
    }
    const status = /\/machines\/user-machines\/([^/]+)\/status$/.exec(path);
    if (status) {
      const state = states[status[1]] ?? { machine_status: "stopped", is_active: false };
      // A started-up machine reports "starting" once, then "started".
      if (state.machine_status === "pending") state.machine_status = "started";
      else if (state.is_active && state.machine_status === "stopped") state.machine_status = "pending";
      return json(res, 200, { status: "success", data: { user_machine_id: status[1], ...state } });
    }
    if (path.endsWith("/machines/user-machines/toggle-active")) {
      const { user_machine_id, is_active } = JSON.parse(body.toString());
      recorded.push({ path, toggle: { user_machine_id, is_active } });
      states[user_machine_id] = { machine_status: is_active ? "stopped" : "stopped", is_active };
      return json(res, 200, { status: "success", data: {} });
    }

    try {
      const parsed = JSON.parse(body.toString());
      recorded.push({ path, compute: parsed.compute ?? null, program: parsed.program });
    } catch {
      // Not JSON: nothing to record.
    }
    const proxied = http.request(
      { host: upstream.hostname, port: upstream.port, path: req.url, method: req.method, headers: req.headers },
      (upstreamRes) => {
        res.writeHead(upstreamRes.statusCode, upstreamRes.headers);
        upstreamRes.pipe(res);
      },
    );
    proxied.on("error", (error) => json(res, 502, { status: "error", message: String(error) }));
    proxied.end(body);
  });

  // WebSockets (concept run streams): record the first frame is not needed,
  // the run's compute is checked on the fetch that follows; just tunnel.
  server.on("upgrade", (req, socket, head) => {
    const tunnel = net.connect(Number(upstream.port), upstream.hostname, () => {
      const headers = Object.entries(req.headers).map(([key, value]) => `${key}: ${value}`).join("\r\n");
      tunnel.write(`${req.method} ${req.url} HTTP/1.1\r\n${headers}\r\n\r\n`);
      tunnel.write(head);
      tunnel.pipe(socket).pipe(tunnel);
    });
    tunnel.on("error", () => socket.destroy());
    socket.on("error", () => tunnel.destroy());
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}
