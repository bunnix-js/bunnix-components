import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function CodeBlockPage() {
  const headerOffset = "6rem";

  const source = [
    "const message = \"Hello Bunnix\";",
    "console.log(message);"
  ].join("\n");
  const sample = Prism.highlight(source, Prism.languages.javascript, "javascript");
  const usageSource = [
    "import Prism from \"prismjs\";",
    "import \"prismjs/components/prism-javascript.js\";",
    "import \"prismjs/themes/prism.css\";",
    "",
    "const source = `const message = \\\"Hello Bunnix\\\";`;",
    "const html = Prism.highlight(source, Prism.languages.javascript, \"javascript\");",
    "",
    "CodeBlock({ html, language: \"js\" });"
  ].join("\n");
  const usageSnippet = Prism.highlight(usageSource, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({
      title: "Code Block",
      description: "Safe container for preformatted HTML from external syntax highlighters."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "HTML input", stickyOffset: headerOffset }, [
        p("This example uses PrismJS in the playground only. Your app can use any external highlighter and pass the formatted HTML."),
        CodeBlock({ html: sample, language: "js" })
      ]),

      PageSection({ title: "Prism usage snippet", stickyOffset: headerOffset }, [
        p("This is the exact code used in the playground to generate highlighted HTML."),
        CodeBlock({ html: usageSnippet, language: "js", wrap: true })
      ]),

      PageSection({ title: "Wrapped lines", stickyOffset: headerOffset }, [
        CodeBlock({ html: sample, wrap: true })
      ])
    ])
  ]);
}
