import Bunnix from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import Text from "../../components/Text.mjs";
import Container from "../../components/Container.mjs";

const { div, p, span } = Bunnix;

export default function TextPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({ 
      title: "Text", 
      description: "A polymorphic typography component for semantic text rendering." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Types (Semantic Tags)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          Text({ type: "heading1" }, "Heading 1 (h1)"),
          Text({ type: "heading2" }, "Heading 2 (h2)"),
          Text({ type: "heading3" }, "Heading 3 (h3)"),
          Text({ type: "heading4" }, "Heading 4 (h4)"),
          Text({ type: "paragraph" }, "This is a paragraph (p) text that represents a block of content with standard spacing and line height."),
          Text({ type: "text" }, "Regular inline text (span)"),
        ])
      ]),

      PageSection({ title: "Colors", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-sm" }, [
          Text({ color: "primary" }, "Primary Color"),
          Text({ color: "secondary" }, "Secondary Color"),
          Text({ color: "tertiary" }, "Tertiary Color"),
          Text({ color: "destructive" }, "Destructive Color"),
          Text({ color: "accent" }, "Accent Color"),
        ])
      ]),

      PageSection({ title: "Designs", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-sm" }, [
          Text({ design: "regular" }, "Regular Sans-Serif Font"),
          Text({ design: "mono" }, "Monospace Font Style"),
          Text({ type: "heading3", design: "mono", color: "accent" }, "Mono Accent Heading"),
        ])
      ]),

      PageSection({ title: "Defaults", stickyOffset: headerOffset }, [
        p({ class: "pb-sm" }, "When props are omitted, it defaults to a primary-colored span."),
        div({ class: "card box bg-dimmed" }, [
          Text({}, "I am a default Text component.")
        ])
      ])
    ])
  ]);
}
