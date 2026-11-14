<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Saleswise documentation rules

Read this section at the start of every session that edits this project. For feature or module guide work, read `skills/saleswise-docs-guides/SKILL.md`. Before editing article content, read both `content/docs/en/markdown-reference.md` and `content/docs/ar/markdown-reference.md`. They demonstrate the supported authoring formats; ordinary guides should use only formatting that helps the reader complete the task, not every example on the reference page.

- Keep English and Arabic articles aligned. Use the correct locale in links and verify RTL layout for Arabic.
- Verify product steps and claims against the relevant source app or a live test. In the Saleswise workspace, use `../plugins/skills/saleswise-code-to-docs/SKILL.md` when seeding or updating source-backed guides. Do not present examples, placeholders, or unverified behavior as confirmed product behavior.
- Use fenced `mermaid` blocks for useful flowcharts and diagrams. They render through the Fumadocs transform in `lib/source.ts` and the client component in `app/[lang]/docs/MermaidDiagram.tsx`. Keep source available through the diagram's details toggle. Preserve the Saleswise palette and fonts from `app/saleswise.css`, and check both locales after changing diagram rendering or styling.
- Do not add unsupported Markdown, HTML, or MDX syntax to shopper guides merely because it appears as a source example in the reference. Confirm renderer support before using a new format.
- For content changes, run `npm run validate:content` and `npm test`. For renderer or layout changes, also run `npm run typecheck`, `npm run build`, and browser-check the English and Arabic routes.
