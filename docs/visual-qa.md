# Diagram visual QA

Reviewed 2026-09-19 after regenerating the diagram render set with:

```sh
NODE_PATH=/Users/neelbarmecha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules node tools/diagrams-qa.js
```

The renderer produced 298 diagram renders and 66 contact sheets. Every light and dark contact sheet for units 01–16 was inspected for text contrast, readability, overlap, and clipping.

## Final result

The first pass found layout problems in u05-l1-1, u05-l5-1, u13-l4-1, u13-l5-1, u13-l7-1, u14-l8-1 and u16-l3-1. The labels were repositioned, shortened, or split across lines as appropriate. The u10-l6-1 microbubble labels remain dense but readable and do not overlap.

After the fixes, the renderer reported `298 diagram renders; 0 diagrams with text outside viewBox`. Each changed diagram was re-inspected individually in light and dark mode. All diagrams are readable in both themes, with no observed clipping or material overlap.
