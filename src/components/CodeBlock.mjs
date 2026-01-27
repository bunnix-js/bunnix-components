import Bunnix from "@bunnix/core";

const { div, pre, code } = Bunnix;

export default function CodeBlock({
  html,
  language,
  overflowX = "auto",
  wrap = false,
  class: className = "",
  ...rest
} = {}, children) {
  const languageClass = language ? `language-${language}` : "";
  const wrapClass = wrap ? "codeblock-wrap" : "";
  const codeChildren = html ? null : children;
  const codeProps = {
    class: `codeblock-code ${languageClass}`.trim()
  };
  if (html !== null && html !== undefined) {
    codeProps.innerHTML = html;
  }

  return div({ class: `codeblock ${className}`.trim(), ...rest }, [
    pre({
      class: `codeblock-pre ${wrapClass}`.trim(),
      style: { overflowX, overflowY: "auto" }
    }, [
      code(codeProps, codeChildren)
    ])
  ]);
}
