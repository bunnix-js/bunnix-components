import Bunnix from "@bunnix/core";
const { div, h1, p } = Bunnix;

export default function PageHeader({ title, description } = {}) {
  return div({
    class: "row-container sticky-top bg-base no-margin pt-md pb-md z-99"
  }, [
    div({ class: "column-container gap-xs flex-1" }, [
      h1({ class: "no-margin" }, title),
      p({ class: "text-secondary no-margin" }, description)
    ])
  ]);
}
