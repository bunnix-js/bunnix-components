import Bunnix, { useState } from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { InputField } from "@bunnix/components";
import { CodeBlock } from "@bunnix/components";
import { Container } from "@bunnix/components";
import { Text } from "@bunnix/components";
import Prism from "prismjs";
import "prismjs/components/prism-javascript.js";
import "prismjs/themes/prism.css";

const { div, p } = Bunnix;

export default function InputFieldPage() {
  const headerOffset = "6rem";
  
  const maskedValue = useState("");
  
  const commonSnippet = `InputField({ label: "Text Input", placeholder: "Type something..." });
InputField({ type: "search", label: "Search", placeholder: "Search..." });
InputField({ type: "email", label: "Email", placeholder: "user@example.com" });
InputField({ type: "password", label: "Password" });`;
  const commonHtml = Prism.highlight(commonSnippet, Prism.languages.javascript, "javascript");

  const maskDateSnippet = `InputField({ label: "Date", mask: "date", placeholder: "DD/MM/YYYY" });`;
  const maskDateHtml = Prism.highlight(maskDateSnippet, Prism.languages.javascript, "javascript");

  const maskTimeSnippet = `InputField({ label: "Time", mask: "time", placeholder: "HH:MM" });`;
  const maskTimeHtml = Prism.highlight(maskTimeSnippet, Prism.languages.javascript, "javascript");

  const maskCurrencySnippet = `InputField({ 
  label: "Price", 
  mask: { 
    type: "currency",
    options: { prefix: "$", decimalPlaces: 2 }
  }
});`;
  const maskCurrencyHtml = Prism.highlight(maskCurrencySnippet, Prism.languages.javascript, "javascript");

  const maskDecimalSnippet = `InputField({ label: "Decimal", mask: "decimal" });`;
  const maskDecimalHtml = Prism.highlight(maskDecimalSnippet, Prism.languages.javascript, "javascript");

  const maskIntegerSnippet = `InputField({ label: "Integer", mask: "integer" });`;
  const maskIntegerHtml = Prism.highlight(maskIntegerSnippet, Prism.languages.javascript, "javascript");

  const maskPhoneSnippet = `InputField({ label: "Phone (US)", mask: "phone", placeholder: "+1 (234) 567-8900" });`;
  const maskPhoneHtml = Prism.highlight(maskPhoneSnippet, Prism.languages.javascript, "javascript");

  const maskPhoneBRSnippet = `InputField({ label: "Phone (BR)", mask: "phone-br", placeholder: "+55 11 99999-9999" });`;
  const maskPhoneBRHtml = Prism.highlight(maskPhoneBRSnippet, Prism.languages.javascript, "javascript");

  const maskCreditCardSnippet = `InputField({ label: "Credit Card", mask: "credit-card", placeholder: "1234 5678 9012 3456" });`;
  const maskCreditCardHtml = Prism.highlight(maskCreditCardSnippet, Prism.languages.javascript, "javascript");

  const maskCPFSnippet = `InputField({ label: "CPF", mask: "cpf", placeholder: "123.456.789-01" });`;
  const maskCPFHtml = Prism.highlight(maskCPFSnippet, Prism.languages.javascript, "javascript");

  const maskCNPJSnippet = `InputField({ label: "CNPJ", mask: "cnpj", placeholder: "12.345.678/0001-90" });`;
  const maskCNPJHtml = Prism.highlight(maskCNPJSnippet, Prism.languages.javascript, "javascript");

  const maskCEPSnippet = `InputField({ label: "CEP", mask: "cep", placeholder: "12345-678" });`;
  const maskCEPHtml = Prism.highlight(maskCEPSnippet, Prism.languages.javascript, "javascript");

  const maskCustomSnippet = `// Pattern: 9=digit, A=letter, *=alphanumeric
InputField({ 
  label: "Custom Pattern", 
  mask: { pattern: "999.999.999-99" },
  placeholder: "xxx.xxx.xxx-xx"
});`;
  const maskCustomHtml = Prism.highlight(maskCustomSnippet, Prism.languages.javascript, "javascript");

  const suggestionSnippet = `InputField({
  label: "Framework",
  placeholder: "Start typing...",
  suggestions: ["Bunnix", "React", "Vue", "Angular", "Svelte"]
});`;
  const suggestionHtml = Prism.highlight(suggestionSnippet, Prism.languages.javascript, "javascript");

  const sizeSnippet = `InputField({ label: "Regular", size: "regular" });
InputField({ label: "Large", size: "large" });
InputField({ label: "X-Large", size: "xlarge" });`;
  const sizeHtml = Prism.highlight(sizeSnippet, Prism.languages.javascript, "javascript");

  const roundedSnippet = `InputField({ label: "Rounded", variant: "rounded" });`;
  const roundedHtml = Prism.highlight(roundedSnippet, Prism.languages.javascript, "javascript");

  const disabledSnippet = `InputField({ label: "Disabled", disabled: true, value: "Read-only" });`;
  const disabledHtml = Prism.highlight(disabledSnippet, Prism.languages.javascript, "javascript");

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Input Field", 
      description: "Text input with support for labels, masks, autocomplete, and suggestions." 
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Common Types", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Standard HTML input types with label support."),
          div({ class: "column-container gap-md items-start max-w-400" }, [
            InputField({ label: "Text Input", placeholder: "Type something..." }),
            InputField({ type: "search", label: "Search", placeholder: "Search..." }),
            InputField({ type: "email", label: "Email", placeholder: "user@example.com" }),
            InputField({ type: "password", label: "Password", value: "secret" })
          ]),
          CodeBlock({ html: commonHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Input Masks", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-lg" }, [
          p({ class: "pb-sm" }, "Apply input masks for formatted data entry. Masks automatically format values as you type."),
          
          div({ class: "column-container gap-md" }, [
            Text({ type: "heading4" }, "Date & Time"),
            div({ class: "grid-flow gap-md items-start" }, [
              div({ class: "w-300" }, [
                InputField({ label: "Date", mask: "date", placeholder: "DD/MM/YYYY" })
              ]),
              div({ class: "w-300" }, [
                InputField({ label: "Time", mask: "time", placeholder: "HH:MM" })
              ])
            ]),
            div({ class: "row-container gap-md" }, [
              CodeBlock({ html: maskDateHtml, language: "js", wrap: true }),
              CodeBlock({ html: maskTimeHtml, language: "js", wrap: true })
            ])
          ]),

          div({ class: "column-container gap-md" }, [
            Text({ type: "heading4" }, "Financial"),
            div({ class: "grid-flow gap-md items-start" }, [
              div({ class: "w-300" }, [
                InputField({ 
                  label: "Price", 
                  mask: { type: "currency", options: { prefix: "$", decimalPlaces: 2 } }
                })
              ]),
              div({ class: "w-300" }, [
                InputField({ label: "Decimal", mask: "decimal", placeholder: "0.00" })
              ]),
              div({ class: "w-300" }, [
                InputField({ label: "Integer", mask: "integer", placeholder: "123" })
              ])
            ]),
            div({ class: "row-container gap-md" }, [
              CodeBlock({ html: maskCurrencyHtml, language: "js", wrap: true }),
              CodeBlock({ html: maskDecimalHtml, language: "js", wrap: true }),
              CodeBlock({ html: maskIntegerHtml, language: "js", wrap: true })
            ])
          ]),

          div({ class: "column-container gap-md" }, [
            Text({ type: "heading4" }, "Contact & Payment"),
            div({ class: "grid-flow gap-md items-start" }, [
              div({ class: "w-300" }, [
                InputField({ label: "Phone (US)", mask: "phone", placeholder: "+1 (234) 567-8900" })
              ]),
              div({ class: "w-300" }, [
                InputField({ label: "Phone (BR)", mask: "phone-br", placeholder: "+55 11 99999-9999" })
              ]),
              div({ class: "w-300" }, [
                InputField({ label: "Credit Card", mask: "credit-card", placeholder: "1234 5678 9012 3456" })
              ])
            ]),
            div({ class: "row-container gap-md" }, [
              CodeBlock({ html: maskPhoneHtml, language: "js", wrap: true }),
              CodeBlock({ html: maskPhoneBRHtml, language: "js", wrap: true }),
              CodeBlock({ html: maskCreditCardHtml, language: "js", wrap: true })
            ])
          ]),

          div({ class: "column-container gap-md" }, [
            Text({ type: "heading4" }, "Brazilian Documents"),
            div({ class: "grid-flow gap-md items-start" }, [
              div({ class: "w-300" }, [
                InputField({ label: "CPF", mask: "cpf", placeholder: "123.456.789-01" })
              ]),
              div({ class: "w-300" }, [
                InputField({ label: "CNPJ", mask: "cnpj", placeholder: "12.345.678/0001-90" })
              ]),
              div({ class: "w-300" }, [
                InputField({ label: "CEP", mask: "cep", placeholder: "12345-678" })
              ])
            ]),
            div({ class: "row-container gap-md" }, [
              CodeBlock({ html: maskCPFHtml, language: "js", wrap: true }),
              CodeBlock({ html: maskCNPJHtml, language: "js", wrap: true }),
              CodeBlock({ html: maskCEPHtml, language: "js", wrap: true })
            ])
          ]),

          div({ class: "column-container gap-md" }, [
            Text({ type: "heading4" }, "Custom Pattern"),
            p({}, "Create custom masks using pattern syntax: 9 (digit), A (letter), * (alphanumeric). Other characters are literals."),
            div({ class: "w-300" }, [
              InputField({ 
                label: "Custom Pattern", 
                mask: { pattern: "999.999.999-99" },
                placeholder: "xxx.xxx.xxx-xx",
                value: maskedValue,
                input: (e) => maskedValue.set(e.target.value)
              })
            ]),
            maskedValue.get() && Text({ class: "text-secondary" }, `Value: ${maskedValue.get()}`),
            CodeBlock({ html: maskCustomHtml, language: "js", wrap: true })
          ])
        ])
      ]),

      PageSection({ title: "Suggestions (Datalist)", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Provide autocomplete suggestions using HTML datalist."),
          div({ class: "w-300" }, [
            InputField({
              label: "Framework",
              placeholder: "Start typing...",
              suggestions: ["Bunnix", "React", "Vue", "Angular", "Svelte"]
            })
          ]),
          CodeBlock({ html: suggestionHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Sizes", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Available sizes: regular, large, and xlarge."),
          div({ class: "column-container gap-md items-start max-w-400" }, [
            InputField({ label: "Regular", size: "regular", placeholder: "Regular size" }),
            InputField({ label: "Large", size: "large", placeholder: "Large size" }),
            InputField({ label: "X-Large", size: "xlarge", placeholder: "X-Large size" })
          ]),
          CodeBlock({ html: sizeHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Rounded Variant", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Fully rounded input style."),
          div({ class: "w-300" }, [
            InputField({ label: "Rounded", variant: "rounded", placeholder: "Rounded input" })
          ]),
          CodeBlock({ html: roundedHtml, language: "js", wrap: true })
        ])
      ]),

      PageSection({ title: "Disabled State", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          p({ class: "pb-sm" }, "Disabled state prevents interaction."),
          div({ class: "w-300" }, [
            InputField({ label: "Disabled", disabled: true, value: "Read-only content" })
          ]),
          CodeBlock({ html: disabledHtml, language: "js", wrap: true })
        ])
      ])
    ])
  ]);
}
