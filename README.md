# Saleswise documentation

The public English and Arabic Saleswise guides are maintained in this repository. It includes shopper, tenant-workspace, and Saleswise Admin usage guides. All content and assets here are public; application access to tenant and Admin data is enforced by those applications.

## Local development

Use Node.js 22.22 or later.

```sh
npm ci
npm run dev
```

Open `http://localhost:3003/en` or `http://localhost:3003/ar`. The Saleswise `local-dev/` launcher in the wider workspace maps the app to `http://docs.saleswise.me`.

## Checks

```sh
npm run validate:content
npm test
npm run typecheck
npm run build
```

Guides live under `content/docs/en/` and `content/docs/ar/`. Keep both locales aligned and follow [the guide workflow](skills/saleswise-docs-guides/SKILL.md) before changing a guide. Do not add customer data, credentials, source evidence, or confidential operating procedures to this public repository.
