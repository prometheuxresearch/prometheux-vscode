# Connect to Prometheux

Run **Prometheux: Sign In** and choose where your platform runs:

- **Prometheux Cloud**: paste an API key (Settings → API keys in the Prometheux app). The URL
  `https://api.prometheux.ai/jarvispy/<organization>/<username>` is worked out from the token.
- **Self-hosted / BYOC**: enter your platform's API URL, then the token.
- **Local development**: `http://localhost:8000`; a development backend accepts `devtoken`.

The token is kept in VS Code's secret storage. The URL is the `prometheux.apiUrl` setting, so a
workspace can point at a different platform than your user settings.

Already using the px CLI or the SDKs? `px login` credentials and the `JARVISPY_URL` /
`PMTX_TOKEN` environment variables are picked up automatically.
