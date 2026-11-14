"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";

type RenderState =
  | { readonly status: "loading" }
  | { readonly status: "ready"; readonly svg: string }
  | { readonly status: "error" };

let renderQueue = Promise.resolve();

export function MermaidDiagram({ chart }: { readonly chart: string }) {
  const isArabic = usePathname().startsWith("/ar/");
  const id = useId().replaceAll(":", "");
  const [state, setState] = useState<RenderState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    renderQueue = renderQueue.then(async () => {
      if (cancelled) return;
      try {
        const { default: mermaid } = await import("mermaid");
        const rootStyles = getComputedStyle(document.documentElement);
        const color = (name: string) => rootStyles.getPropertyValue(name).trim();
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            background: color("--sw-paper"),
            primaryColor: color("--sw-sky-pale"),
            primaryTextColor: color("--sw-ink"),
            primaryBorderColor: color("--sw-sky-deep"),
            secondaryColor: color("--sw-ground"),
            secondaryTextColor: color("--sw-ink"),
            secondaryBorderColor: color("--sw-border"),
            tertiaryColor: color("--sw-paper"),
            tertiaryTextColor: color("--sw-ink"),
            tertiaryBorderColor: color("--sw-border"),
            lineColor: color("--sw-sky-deep"),
            textColor: color("--sw-ink"),
            edgeLabelBackground: color("--sw-paper"),
            fontFamily: getComputedStyle(document.body).fontFamily,
            pie1: color("--sw-sky"),
            pie2: color("--sw-yellow"),
            pie3: color("--sw-sky-pale"),
            pie4: color("--sw-border"),
            pieSectionTextColor: color("--sw-ink"),
            pieLegendTextColor: color("--sw-ink"),
            pieTitleTextColor: color("--sw-ink"),
            pieStrokeColor: color("--sw-border"),
            pieOuterStrokeColor: color("--sw-border"),
            pieOpacity: 1,
            git0: color("--sw-sky-deep"),
            git1: color("--sw-yellow"),
          },
        });
        const { svg } = await mermaid.render(`sw-mermaid-${id}`, chart);
        if (!cancelled) setState({ status: "ready", svg });
      } catch {
        if (!cancelled) setState({ status: "error" });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  return (
    <figure className="sw-mermaid">
      {state.status === "ready" ? (
        <div className="sw-mermaid-graphic" dangerouslySetInnerHTML={{ __html: state.svg }} />
      ) : state.status === "error" ? (
        <p>{isArabic ? "تعذّر عرض المخطط. يمكنك الاطلاع على مصدر Mermaid أدناه." : "Diagram preview unavailable. View the Mermaid source below."}</p>
      ) : (
        <p>{isArabic ? "جارٍ عرض المخطط…" : "Rendering diagram…"}</p>
      )}
      <details>
        <summary>{isArabic ? "عرض مصدر Mermaid" : "View Mermaid source"}</summary>
        <pre><code>{chart}</code></pre>
      </details>
    </figure>
  );
}
