# Platform and Local

The **Prometheux** view in the activity bar has two parts.

**Platform** lists the ontologies on your platform. Click a concept to open it: saving the editor
saves the concept, `Cmd/Ctrl+Shift+Enter` runs it. Vadalog concepts get highlighting, hover,
completion, go to definition and outline. Bindings stay as they are; they are shown in the
concept's tooltip and managed in the Prometheux app.

**Local** shows what lives in your workspace:

- **Ontologies** downloaded with *Download to Workspace* (the cloud icon on a platform
  ontology). They are the files `px pull` writes, ready for git. **Apply to Platform** (the
  upload icon) shows what changed and pushes it back.
- **Vadalog Files** that belong to no ontology. Evaluate them on the engine with
  `Cmd/Ctrl+Shift+Enter` or the ▶ button; nothing is saved on the platform.
