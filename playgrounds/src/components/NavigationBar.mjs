import Bunnix from "@bunnix/core";
import InputField from "./InputField.mjs";

const { nav, div, h2 } = Bunnix;

const renderNode = (node) => (typeof node === "function" ? node() : node);

export default function NavigationBar({
  title,
  leading,
  trailing,
  searchable = false,
  searchProps = {},
  class: className = "",
  ...rest
} = {}) {
  const titleNode = typeof title === "string"
    ? h2({ class: "whitespace-nowrap" }, title)
    : renderNode(title);

  const leadingNode = renderNode(leading);
  const trailingNode = renderNode(trailing);

  return nav({
    class: `navigation-bar row-container items-center gap-md w-full sticky-top bg-base ${className}`.trim(),
    ...rest
  }, [
    titleNode,
    leadingNode && div({ class: "shrink-0" }, leadingNode),
    div({ class: "w-full" }),
    trailingNode && div({ class: "shrink-0" }, trailingNode),
    searchable && InputField({
      type: "search",
      placeholder: "Search components",
      class: "rounded-full w-300",
      ...searchProps
    })
  ]);
}
