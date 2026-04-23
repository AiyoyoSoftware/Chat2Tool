# Contributing

Thanks for taking a look at Chat2Tool.

This project is in `0.1` alpha. The best contributions right now are focused bug reports, small fixes, example tools, and improvements to the generation prompt or theme framework.

## Development

```bash
npm run dev
```

Open `http://localhost:9944`.

Before opening a pull request, run:

```bash
npm run check
```

## Project Shape

Chat2Tool intentionally has no build step and no frontend package pipeline. Keep changes close to the existing static HTML/CSS/JS structure unless there is a clear reason to expand the architecture.

Generated tools should continue to follow the `data-llastro-*` runtime contract. That namespace is kept for compatibility even though the public project name is Chat2Tool.

## Useful Contributions

- Fixes to the wizard, library, editor, import, export, or persistence flows.
- Better examples that show notes or conversations becoming reusable tools.
- Accessibility fixes.
- RTL and multilingual improvements.
- Focused tests or validation checks around import/sanitize/export behavior.

Please avoid broad rewrites, new build tooling, or external runtime dependencies unless the tradeoff is discussed first.
