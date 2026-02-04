import Bunnix from "@bunnix/core";
const { div, h5 } = Bunnix;

export default function PageSection(props = {}, ...children) {
  const isElement = props && typeof props === "object" && "tag" in props;
  if (props === null || props === undefined || Array.isArray(props) || typeof props !== "object" || isElement) {
    const initialChildren = Array.isArray(props) ? props : [props];
    children = [...initialChildren, ...children].filter((child) => child !== undefined);
    props = {};
  }

  const {
    title,
    stickyOffset = 0,
    gap = "regular",
    trailing,
    children: propsChildren,
  } = props;

  let normalizedChildren = children.length ? children : propsChildren || [];
  if (normalizedChildren.length === 1 && Array.isArray(normalizedChildren[0])) {
    normalizedChildren = normalizedChildren[0];
  }
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
    div({ class: `column-container py-xs ${gapMap[gap]}`.trim() }, normalizedChildren),
  ]);
}
