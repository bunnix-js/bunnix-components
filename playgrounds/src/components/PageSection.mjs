import Bunnix from "@bunnix/core";
const { div, h5 } = Bunnix;

export default function PageSection({ title, stickyOffset = 0 } = {}, children) {
  return div({ class: "column-container no-margin" }, [
    div({
      class: "sticky-top bg-base pt-sm pb-sm",
      style: ` --sticky-offset: ${stickyOffset}`
    }, [
      h5({ class: "no-margin select-none" }, title)
    ]),
    div({ class: "column-container py-xs" }, children)
  ]);
}
