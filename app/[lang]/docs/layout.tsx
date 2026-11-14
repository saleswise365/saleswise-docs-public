import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { getSource } from "@/lib/source";
import type { Node as PageTreeNode } from "fumadocs-core/page-tree";
import { SidebarFolder, SidebarNavigationProvider } from "./SidebarNavigation";
import { HomeSearch } from "../HomeSearch";
import { notFound } from "next/navigation";

function containsLocale(node: PageTreeNode, lang: string): boolean {
  if (node.type === "page") return node.url.startsWith(`/docs/${lang}`);
  if (node.type === "folder")
    return (
      Boolean(node.index?.url.startsWith(`/docs/${lang}`)) ||
      node.children.some((child) => containsLocale(child, lang))
    );
  return false;
}

function localizeNode(node: PageTreeNode, lang: string): PageTreeNode {
  if (node.type === "page")
    return {
      ...node,
      url: node.url.replace(/^\/docs\/(en|ar)(?=\/|$)/, "/$1/docs"),
    };
  if (node.type === "folder") {
    const folderName = node.$ref?.folder.split("/").at(-1);
    const arabicNames: Record<string, string> = {
      account: "الحساب والطلبات",
      shopping: "التسوق",
      support: "المساعدة",
      tenant: "إدارة المتجر",
      platform: "إدارة سيلزوايز",
    };
    return {
      ...node,
      name:
        lang === "ar" && folderName
          ? (arabicNames[folderName] ?? node.name)
          : node.name,
      index: node.index
        ? {
            ...node.index,
            url: node.index.url.replace(/^\/docs\/(en|ar)(?=\/|$)/, "/$1/docs"),
          }
        : undefined,
      children: node.children.map((child) => localizeNode(child, lang)),
    };
  }
  return node;
}

export default async function Layout({
  children,
  params,
}: {
  readonly children: ReactNode;
  readonly params: Promise<{ readonly lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ar") notFound();
  const source = await getSource();
  const tree = source.getPageTree();
  const localeFolder = tree.children.find(
    (node) => node.type === "folder" && containsLocale(node, lang),
  );
  const localeTree =
    localeFolder?.type === "folder"
      ? {
          ...tree,
          children: [
            ...(localeFolder.index ? [localeFolder.index] : []),
            ...localeFolder.children,
          ].map((node) => localizeNode(node, lang)),
        }
      : {
          ...tree,
          children: tree.children
            .filter((node) => containsLocale(node, lang))
            .map((node) => localizeNode(node, lang)),
        };
  return (
    <SidebarNavigationProvider>
      <DocsLayout
        tree={localeTree}
        nav={{ enabled: false }}
        themeSwitch={{ enabled: false }}
        sidebar={{
          components: { Folder: SidebarFolder },
          banner: <HomeSearch lang={lang} variant="sidebar" />,
        }}
      >
        {children}
      </DocsLayout>
    </SidebarNavigationProvider>
  );
}
