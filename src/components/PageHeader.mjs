import Bunnix from "@bunnix/core";
const { div, h2, p } = Bunnix;

export default function PageHeader({ title, description, trailing } = {}) {
  const trailingContent = typeof trailing === "function" ? trailing() : trailing;

  return div({
    class: "row-container items-center gap-md no-margin"
  }, [
    div({ class: "column-container gap-xs flex-1 w-full" }, [
      h2({ class: "no-margin" }, title),
      description ? p({ class: "text-secondary no-margin" }, description) : null
    ]),
    trailingContent ? div({ class: "shrink-0" }, trailingContent) : null
  ].filter(Boolean));
}
