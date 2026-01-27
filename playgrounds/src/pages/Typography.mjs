import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Container } from "@bunnix/components";
const { div, h1, h2, h3, h4, h5, h6, p, span } = Bunnix;

export default function TypographyPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Typography Showcase", 
      description: "Core typography system for the design system." 
    }),
    
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Headings", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          h1("Heading 1"),
          h2("Heading 2"),
          h3("Heading 3"),
          h4("Heading 4"),
          h5("Heading 5"),
          h6("Heading 6"),
        ])
      ]),
      
      PageSection({ title: "Paragraphs", stickyOffset: headerOffset }, [
        p("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
      ]),

      PageSection({ title: "Utilities", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "row-container gap-md items-center" }, [
            span({ class: "text-mono text-sm bg-dimmed text-primary p-xs rounded-sm" }, ".text-mono"),
            span({ class: "text-mono" }, "Monospace font stack")
          ]),
          div({ class: "row-container gap-md items-center" }, [
            span({ class: "text-mono text-sm bg-dimmed text-primary p-xs rounded-sm" }, ".text-sm"),
            span({ class: "text-sm" }, "Small font size")
          ]),
          div({ class: "row-container gap-md items-center" }, [
            span({ class: "text-mono text-sm bg-dimmed text-primary p-xs rounded-sm" }, ".text-base"),
            span({ class: "text-base" }, "Base font size")
          ]),
          div({ class: "row-container gap-md items-center" }, [
            span({ class: "text-mono text-sm bg-dimmed text-primary p-xs rounded-sm" }, ".whitespace-nowrap"),
            div({ class: "w-150 border-dashed p-xs overflow-hidden" }, [
                span({ class: "whitespace-nowrap" }, "This text will not wrap even if it hits the end of the container")
            ])
          ]),
          div({ class: "row-container gap-md items-center" }, [
            span({ class: "text-mono text-sm bg-dimmed text-primary p-xs rounded-sm" }, ".text-destructive"),
            span({ class: "text-destructive" }, "This is a destructive message or warning.")
          ]),
        ])
      ]),
    ])
  ]);
}