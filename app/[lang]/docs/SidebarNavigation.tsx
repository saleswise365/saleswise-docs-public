"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Folder, Node } from "fumadocs-core/page-tree";

type OpenFolder = { key: string | null; path: string } | null;

function containsPath(node: Node, pathname: string): boolean {
  if (node.type === "page") return node.url === pathname;
  if (node.type === "folder") {
    return (
      node.index?.url === pathname ||
      node.children.some((child) => containsPath(child, pathname))
    );
  }
  return false;
}

const SidebarNavigationContext = createContext<{
  openFolder: OpenFolder;
  setOpenFolder: (value: OpenFolder) => void;
} | null>(null);

export function SidebarNavigationProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const pathname = usePathname();
  const [openFolder, setOpenFolder] = useState<OpenFolder>(null);
  useEffect(() => setOpenFolder(null), [pathname]);
  return (
    <SidebarNavigationContext.Provider value={{ openFolder, setOpenFolder }}>
      {children}
    </SidebarNavigationContext.Provider>
  );
}

export function DocsCategoryIcon({ category }: { readonly category: string }) {
  const common = {
    width: 17,
    height: 17,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  if (
    category === "account" ||
    category === "start" ||
    category === "addresses"
  )
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0 1 14 0" />
      </svg>
    );
  if (
    category === "shopping" ||
    category === "discover" ||
    category === "products"
  )
    return (
      <svg {...common}>
        <path d="M4 9h16l-1.2 11H5.2L4 9Z" />
        <path d="M8 9V7a4 4 0 0 1 8 0v2" />
      </svg>
    );
  if (category === "checkout" || category === "orders")
    return (
      <svg {...common}>
        <path d="M5 4h14v16l-3-2-4 2-4-2-3 2V4Z" />
        <path d="M9 9h6M9 13h6" />
      </svg>
    );
  if (category === "tenant" || category === "manage")
    return (
      <svg {...common}>
        <path d="M3 9h18l-2-5H5L3 9Zm1 0v11h16V9M9 20v-7h6v7" />
      </svg>
    );
  if (category === "platform")
    return (
      <svg {...common}>
        <path d="M4 21V6l8-3 8 3v15H4ZM8 10h2m4 0h2M8 14h2m4 0h2M10 21v-4h4v4" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01" />
    </svg>
  );
}

export function SidebarFolder({
  item,
  children,
}: {
  readonly item: Folder;
  readonly children: ReactNode;
}) {
  const context = useContext(SidebarNavigationContext);
  const pathname = usePathname();
  const key = item.$ref?.folder ?? String(item.name ?? "folder");
  const openFolder = context?.openFolder;
  const isOpen =
    openFolder?.path === pathname
      ? openFolder.key === key
      : containsPath(item, pathname);
  const category = key.split("/").at(-1) ?? key;
  const toggleFolder = () =>
    context?.setOpenFolder({ key: isOpen ? null : key, path: pathname });
  return (
    <div className="sw-sidebar-folder">
      <div
        className="sw-sidebar-folder-trigger"
        data-expanded={isOpen}
      >
        {item.index ? (
          <Link
            className="sw-sidebar-folder-link"
            href={item.index.url}
            aria-current={pathname === item.index.url ? "page" : undefined}
          >
            <DocsCategoryIcon category={category} />
            <span>{item.name}</span>
          </Link>
        ) : (
          <button
            className="sw-sidebar-folder-link"
            type="button"
            onClick={toggleFolder}
          >
            <DocsCategoryIcon category={category} />
            <span>{item.name}</span>
          </button>
        )}
        <button
          className="sw-sidebar-folder-toggle"
          type="button"
          aria-label={
            pathname.startsWith("/ar/")
              ? isOpen
                ? "إغلاق القسم"
                : "فتح القسم"
              : isOpen
                ? "Collapse section"
                : "Expand section"
          }
          aria-expanded={isOpen}
          onClick={toggleFolder}
        >
          <svg
            className="sw-sidebar-chevron"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="sw-sidebar-folder-content" hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
