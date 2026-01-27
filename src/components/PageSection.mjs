import Bunnix from "@bunnix/core";
const { div, h5 } = Bunnix;

export default function PageSection({ title, stickyOffset = 0, gap = "regular" } = {}, children) {
  const gapMap = {
    small: "gap-sm",
    regular: "gap-md",
    large: "gap-lg"
  };

  return div({ class: "column-container no-margin" }, [
    div({
      class: "pt-sm pb-sm",
      style: ` --sticky-offset: ${stickyOffset}`
    }, [
      h5({ class: "no-margin select-none" }, title)
    ]),
    div({ class: `column-container py-xs ${gapMap[gap]}`.trim() }, children)
  ]);
}
