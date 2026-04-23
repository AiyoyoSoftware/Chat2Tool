# Security

Chat2Tool is an alpha local-first tool. Treat generated tools as code produced by an LLM.

## Generated HTML

Chat2Tool constrains imported tools before preview and save:

- External scripts are removed.
- Custom stylesheets and inline `<style>` blocks are removed.
- Tools run in sandboxed iframes during preview and library viewing.
- The prompt asks for no network requests, no external assets, and one self-contained root.

These guardrails reduce accidental complexity, but they are not a full security sandbox for hostile code. Only import tool HTML you are comfortable running locally.

## Persistence

Saved tools are written to `data/library.json` by the bundled Node server, or `/data/library.json` in Docker. There is no authentication layer in the alpha release, so expose the server only on trusted networks.

## Reporting Issues

For the alpha, please open a GitHub issue with:

- What you imported or the kind of prompt that produced it.
- What happened.
- Browser and operating system details.
- Whether you were running locally or through Docker.
