import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { ProgressBar } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div } = Bunnix;

export default function ProgressBarPage() {
  const headerOffset = "6rem";

  const sizeSnippet = [
    "ProgressBar({ value: 35, size: \"xsmall\" });",
    "ProgressBar({ value: 45, size: \"small\" });",
    "ProgressBar({ value: 55, size: \"regular\" });",
    "ProgressBar({ value: 65, size: \"large\" });",
    "ProgressBar({ value: 75, size: \"xlarge\" });"
  ].join("\n");
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");

  const colorSnippet = [
    "ProgressBar({ value: 60, color: \"default\" });",
    "ProgressBar({ value: 60, color: \"primary\" });",
    "ProgressBar({ value: 60, color: \"secondary\" });",
    "ProgressBar({ value: 60, color: \"accent\" });",
    "ProgressBar({ value: 60, color: \"destructive\" });"
  ].join("\n");
  const colorHtml = Prism.highlight(colorSnippet, Prism.languages.javascript, "javascript");

  const valueSnippet = [
    "ProgressBar({ value: 20 });",
    "ProgressBar({ value: 45, size: \"large\", color: \"accent\" });",
    "ProgressBar({ value: 90, size: \"xlarge\", color: \"primary-dimmed\" });"
  ].join("\n");
  const valueHtml = Prism.highlight(valueSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Progress Bar",
      description: "A simple progress indicator with size and color variants that align with Text foreground colors."
    }),
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm", style: "max-width: 360px;" }, [
            ProgressBar({ value: 35, size: "xsmall" }),
            ProgressBar({ value: 45, size: "small" }),
            ProgressBar({ value: 55, size: "regular" }),
            ProgressBar({ value: 65, size: "large" }),
            ProgressBar({ value: 75, size: "xlarge" })
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Colors", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm", style: "max-width: 360px;" }, [
            ProgressBar({ value: 60, color: "default" }),
            ProgressBar({ value: 60, color: "primary" }),
            ProgressBar({ value: 60, color: "secondary" }),
            ProgressBar({ value: 60, color: "accent" }),
            ProgressBar({ value: 60, color: "destructive" })
          ]),
          CodeBlock({ html: colorHtml, language: "js", wrap: true })
        ])
      ]),
      PageSection({ title: "Values", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm", style: "max-width: 360px;" }, [
            ProgressBar({ value: 20 }),
            ProgressBar({ value: 45, size: "large", color: "accent" }),
            ProgressBar({ value: 90, size: "xlarge", color: "primary-dimmed" })
          ]),
          CodeBlock({ html: valueHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
