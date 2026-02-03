import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Text } from "@bunnix/components";
import { Container } from "@bunnix/components";
import { Button } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p, span } = Bunnix;

export default function TextPage() {
  const headerOffset = "6rem";
  const typeSnippet = [
    "Text({ type: \"heading1\" }, \"Heading 1 (h1)\");",
    "Text({ type: \"heading2\" }, \"Heading 2 (h2)\");",
    "Text({ type: \"heading3\" }, \"Heading 3 (h3)\");",
    "Text({ type: \"heading4\" }, \"Heading 4 (h4)\");",
    "Text({ type: \"paragraph\" }, \"This is a paragraph (p) text that represents a block of content with standard spacing and line height.\");",
    "Text({ type: \"text\" }, \"Regular inline text (span)\");"
  ].join("\n");
  const typeHtml = Prism.highlight(typeSnippet, Prism.languages.javascript, "javascript");
  const colorSnippet = [
    "Text({ color: \"primary\" }, \"Primary Color\");",
    "Text({ color: \"secondary\" }, \"Secondary Color\");",
    "Text({ color: \"tertiary\" }, \"Tertiary Color\");",
    "Text({ color: \"destructive\" }, \"Destructive Color\");",
    "Text({ color: \"accent\" }, \"Accent Color\");"
  ].join("\n");
  const colorHtml = Prism.highlight(colorSnippet, Prism.languages.javascript, "javascript");
  const designSnippet = [
    "Text({ design: \"regular\" }, \"Regular Sans-Serif Font\");",
    "Text({ design: \"mono\" }, \"Monospace Font Style\");",
    "Text({ type: \"heading3\", design: \"mono\", color: \"accent\" }, \"Mono Accent Heading\");"
  ].join("\n");
  const designHtml = Prism.highlight(designSnippet, Prism.languages.javascript, "javascript");
  const defaultSnippet = [
    "Text({}, \"I am a default Text component.\");"
  ].join("\n");
  const defaultHtml = Prism.highlight(defaultSnippet, Prism.languages.javascript, "javascript");
  const bindingSnippet = [
    "const counter = useState(0);",
    "",
    "Text(counter);",
    "Button({",
    "  variant: \"primary\",",
    "  size: \"sm\",",
    "  onclick: () => counter.set(counter.get() + 1)",
    "}, \"Increment\");",
    "",
    "Text(\"Static text value\");",
    "",
    "const message = useState(\"Dynamic message\");",
    "Text({ color: \"accent\", weight: \"bold\" }, message);",
    "Button({",
    "  variant: \"secondary\",",
    "  size: \"sm\",",
    "  onclick: () => message.set(`Updated at ${new Date().toLocaleTimeString()}`)",
    "}, \"Update Message\");"
  ].join("\n");
  const bindingHtml = Prism.highlight(bindingSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Text", 
      description: "A polymorphic typography component for semantic text rendering." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Types (Semantic Tags)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-md" }, [
            Text({ type: "heading1" }, "Heading 1 (h1)"),
            Text({ type: "heading2" }, "Heading 2 (h2)"),
            Text({ type: "heading3" }, "Heading 3 (h3)"),
            Text({ type: "heading4" }, "Heading 4 (h4)"),
            Text({ type: "paragraph" }, "This is a paragraph (p) text that represents a block of content with standard spacing and line height."),
            Text({ type: "text" }, "Regular inline text (span)"),
          ]),
          CodeBlock({ html: typeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Colors", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            Text({ color: "primary" }, "Primary Color"),
            Text({ color: "secondary" }, "Secondary Color"),
            Text({ color: "tertiary" }, "Tertiary Color"),
            Text({ color: "destructive" }, "Destructive Color"),
            Text({ color: "accent" }, "Accent Color"),
          ]),
          CodeBlock({ html: colorHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Designs", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            Text({ design: "regular" }, "Regular Sans-Serif Font"),
            Text({ design: "mono" }, "Monospace Font Style"),
            Text({ type: "heading3", design: "mono", color: "accent" }, "Mono Accent Heading"),
          ]),
          CodeBlock({ html: designHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Defaults", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "When props are omitted, it defaults to a primary-colored span."),
          div({ class: "card box bg-dimmed" }, [
            Text({}, "I am a default Text component.")
          ]),
          CodeBlock({ html: defaultHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "State Binding", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Text component supports automatic state binding. Pass a Bunnix.State directly and it will reactively update."),
          div({ class: "column-container gap-md" }, [
            div({ class: "card box bg-dimmed column-container gap-sm" }, [
              p({ class: "text-sm text-secondary no-margin" }, "Case 1: Direct state - Text(state)"),
              (() => {
                const counter = useState(0);
                return div({ class: "row-container gap-sm align-center" }, [
                  Text(counter),
                  Button({ 
                    variant: "primary", 
                    size: "sm",
                    onclick: () => counter.set(counter.get() + 1)
                  }, "Increment")
                ]);
              })()
            ]),
            
            div({ class: "card box bg-dimmed column-container gap-sm" }, [
              p({ class: "text-sm text-secondary no-margin" }, "Case 2: Direct string - Text('Value')"),
              Text("Static text value")
            ]),
            
            div({ class: "card box bg-dimmed column-container gap-sm" }, [
              p({ class: "text-sm text-secondary no-margin" }, "Case 3: With props - Text({ color: 'accent' }, state)"),
              (() => {
                const message = useState("Dynamic message");
                return div({ class: "column-container gap-sm" }, [
                  Text({ color: "accent", weight: "bold" }, message),
                  Button({ 
                    variant: "secondary", 
                    size: "sm",
                    onclick: () => message.set(`Updated at ${new Date().toLocaleTimeString()}`)
                  }, "Update Message")
                ]);
              })()
            ])
          ]),
          CodeBlock({ html: bindingHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
