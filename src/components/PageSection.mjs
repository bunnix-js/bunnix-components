import Bunnix from "@bunnix/core";
const { div, h5 } = Bunnix;

export default function PageSection(
  { title, stickyOffset = 0, gap = "regular", trailing } = {},
  children,
) {
  const gapMap = {
    small: "gap-sm",
    regular: "gap-md",
    large: "gap-lg",
  };

  const trailingContent =
    typeof trailing === "function" ? trailing() : trailing;

  return div({ class: "column-container no-margin w-full" }, [
    div(
      {
        class: "row-container items-center gap-md pt-sm pb-sm",
        style: ` --sticky-offset: ${stickyOffset}`,
      },
      [
        h5({ class: "no-margin select-none flex-1 w-full" }, title),
        trailingContent ? div({ class: "shrink-0" }, trailingContent) : null,
      ].filter(Boolean),
    ),
    div({ class: `column-container py-xs ${gapMap[gap]}`.trim() }, children),
  ]);
}
