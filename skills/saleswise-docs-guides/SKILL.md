---
name: saleswise-docs-guides
description: Seed or update a bilingual Saleswise feature or module guide in the single public docs app from current product code and tested UI. Use for guide content, diagrams, screenshots, navigation, and content QA; not for changing product behavior or docs access control.
---

# Saleswise documentation guides

Work from this documentation repository. When the wider Saleswise workspace is available, use `../docs-review/saleswise-code-to-docs/SKILL.md` for deeper route inventory, claim evidence, and classification, and treat `../docs-review/SALESWISE-DOCS-IMPLEMENTATION-PLAN.md` as a historical proposal to check against current code. If source repositories are unavailable, do not invent or update factual product behavior.

## Locate the feature and destination

1. Read this repository's `AGENTS.md` and, when working in the wider workspace, its root and source app `AGENTS.md` files. The projects are separate. `product-web/` and `product-admin/` are product-level apps; `Platform/` is the tenant app, including storefront, account, checkout, and tenant administration. A tenant may be single-store or multi-store; do not infer plan eligibility from the name Enterprise or the existence of a Shop model. Exclude `Jdwa/` unless requested.
2. Identify whether the request is a **new module** (overview plus feature guides), a **new feature guide**, or an **update**. Find its current source route, navigation entry, visible UI, guards, client calls, server behavior, and relevant tests. Read the applicable `Platform/ai_docs/` architecture decision before describing a tenant feature. Check current labels in both dictionaries; some screens still contain hardcoded Arabic labels even in English.
3. All published shopper, tenant, and Saleswise Admin guides live in `saleswise-docs-public/content/docs/{en,ar}/` as `.md` files. A module has an `index.md` overview that explains its purpose and links to its child guides. The docs app is public, so include only sanitized user-facing instructions. Keep source paths, permissions, architecture, and claim provenance in `docs-seed/docs-inventory/`, outside public content. Do not put confidential operational instructions or assets in the public app.
4. For updates, preserve accurate reviewed text and existing URLs. Change the module overview, related links, navigation metadata, or search entry only when the guide's scope or location changes. The public home uses eight page sections; feature links belong inside the appropriate section rather than becoming eight separate sections. Check that the active guide's section opens in the sidebar, the left search works, and its breadcrumb and parent overview are reachable.

## Establish evidence before writing

- Trace the user journey from entry page through component, form, validation, API/service, result and error states. Distinguish source-observed behavior from a browser-tested result. Record material claims with source path, symbol, inspection date, confidence, runtime status, and unresolved questions in the private evidence inventory. Do not invent a Git revision; capture one only when checked.
- Write customer-facing steps from what the user can see and do. Do not expose internal API details, roles, database names, source paths, or test credentials in public articles. Do not claim a purchase, payment, delivery, entitlement, or multi-store behavior that the current source and UI do not support.
- When the source and a screenshot disagree, recheck the running app. Correct stale text or screenshots; mark unresolved facts as needing verification rather than presenting them as instructions.
- Use authorized synthetic test tenants for screenshots and runtime checks. Store no credentials in the skill or guide. Keep real customer data, tokens, debug overlays, and sensitive identifiers out of public images; give each image meaningful alt text and a short caption explaining what to notice.

## Write the guide

- Read both `saleswise-docs-public/content/docs/en/markdown-reference.md` and `saleswise-docs-public/content/docs/ar/markdown-reference.md` before editing public articles. These are **formatting references**, not a checklist: use only headings, lists, tables, links, images, or other formats that help this guide. Many MDX, HTML, math, and alert snippets there are source examples rather than enabled rendering features. Keep ordinary guides short and task focused.
- Keep English and Arabic files aligned in facts, steps, screenshots, and related links. Use locale-qualified links (`/en/docs/...`, `/ar/docs/...`). Use actual UI labels where useful; explain an untranslated label rather than inventing its translation. Frontmatter needs a title and description supported by the public validator.
- A task guide should normally cover prerequisites, entry point, ordered actions, the result, recovery from common errors, and related guides. A module overview should describe the module and direct readers to its main tasks. Use a small comparison or troubleshooting table only where it improves scanning.
- Use a fenced `mermaid` flowchart when it clarifies decisions or outcomes. Use a sequence or other diagram only for a genuinely useful interaction. Keep public diagrams about the visible workflow, not internal algorithms. Mermaid fences render through `saleswise-docs-public/lib/source.ts` and `app/[lang]/docs/MermaidDiagram.tsx`; the component provides a source toggle. Preserve its Saleswise CSS palette, El Messiri font, and RTL layout.
- Follow the current public theme in `saleswise-docs-public/app/saleswise.css`, using `Platform/src/theme` and the product logo as brand references for UI changes. Keep the top bar, sidebar, search, buttons, breadcrumbs, and page navigation functional when a change touches them.

## Verify and hand off

1. In `saleswise-docs-public/`, run `npm run validate:content` and `npm test` for content edits. Run `npm run typecheck` and `npm run build` for renderer, styling, route, or substantial diagram changes. Check both locale routes, links, images, sidebar state, and RTL. A successful Markdown build does **not** prove Mermaid parsed: confirm each new diagram becomes an SVG in a browser and that no preview error appears.
2. Inspect the rendered page at a readable desktop width and, when layout changes, a narrow width. Check diagram labels, clipping, palette, and legend placement in Arabic as well as English. Mermaid SVG text needs left-to-right layout for the current diagrams even within an RTL page; keep the existing SVG direction rule unless deliberately replacing and rechecking it.
3. Avoid running `next build` against the same `.next` directory while relying on a running `next dev` process for QA. If the local `docs.saleswise.me` route serves stale content after a build, verify the new build on an isolated port or restart the docs service without stopping unrelated local-dev apps. State clearly when the user's running service still needs a restart.
4. Report which guides and module links changed, what source and runtime evidence supports the claims, the screenshot and diagram status, checks run, and any unverified behavior. A content edit does not authorize deployment, publication, access-control changes, or production data mutation.
