import Bunnix from "@bunnix/core";
import SearchBox from "./SearchBox.mjs";

const { nav, div, h2 } = Bunnix;

const resolveNode = (node) => {
  if (node && typeof node.map === "function") {
    return node.map((value) => resolveNode(value));
  }
  if (node && typeof node.get === "function") {
    return resolveNode(node.get());
  }
  return typeof node === "function" ? node() : node;
};

const isState = (value) => value && typeof value.get === "function" && typeof value.subscribe === "function";

export default function NavigationBar({
  title,
  leading,
  trailing,
  searchable = false,
  searchData,
  searchValue,
  onSearchInput,
  onSearchSelect,
  searchProps = {},
  class: className = "",
  ...rest
} = {}) {
  const titleContent = isState(title)
    ? title.map((value) => {
        if (value === null || value === undefined) return "";
        return typeof value === "string" || typeof value === "number"
          ? String(value)
          : value;
      })
    : (title === null || title === undefined)
      ? ""
      : typeof title === "string" || typeof title === "number"
        ? String(title)
        : title;

  const titleNode = h2({ class: "whitespace-nowrap" }, titleContent);
  const leadingNode = resolveNode(leading);
  const trailingNode = resolveNode(trailing);

  return nav({
    class: `navigation-bar row-container items-center gap-md w-full sticky-top bg-base ${className}`.trim(),
    ...rest
  }, [
    titleNode,
    leadingNode && div({ class: "shrink-0 row-container items-center" }, leadingNode),
    div({ class: "w-full" }),
    trailingNode && div({ class: "shrink-0 row-container items-center" }, trailingNode),
    searchable && SearchBox({
      data: searchData,
      value: searchValue,
      onInput: onSearchInput,
      onSelect: onSearchSelect,
      placeholder: "Search components",
      variant: "rounded",
      class: "w-300",
      ...searchProps
    })
  ]);
}
