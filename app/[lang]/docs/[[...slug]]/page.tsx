import { notFound } from "next/navigation";
import { DocsBody, DocsPage } from "fumadocs-ui/layouts/docs/page";
import { getSource } from "@/lib/source";
import { DocsIndex } from "./DocsIndex";
import { DocsBreadcrumbs } from "./DocsBreadcrumbs";
import { MermaidDiagram } from "../MermaidDiagram";

type PageProps = {
  readonly params: Promise<{ readonly lang: string; readonly slug?: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { lang, slug } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  const source = await getSource();
  const page = source.getPage([lang, ...(slug ?? [])]);
  if (!page) notFound();
  if (!slug?.length) {
    return (
      <DocsPage
        full
        toc={[]}
        tableOfContent={{ enabled: false }}
        breadcrumb={{ enabled: false }}
        footer={{ enabled: false }}
      >
        <DocsBreadcrumbs
          lang={lang}
          title={lang === "en" ? "All guides" : "جميع الأدلة"}
        />
        <DocsIndex lang={lang} />
      </DocsPage>
    );
  }
  const { render } = await page.data.load();
  const { body, toc } = await render({ Mermaid: MermaidDiagram });
  return (
    <DocsPage toc={toc} breadcrumb={{ enabled: false }}>
      <DocsBreadcrumbs lang={lang} slug={slug} title={page.data.title} />
      <DocsBody>{body}</DocsBody>
    </DocsPage>
  );
}
