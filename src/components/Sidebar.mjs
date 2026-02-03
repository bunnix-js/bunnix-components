import Bunnix, { useMemo, useState, ForEach, Show } from "@bunnix/core";
import SearchBox from "./SearchBox.mjs";
import Badge from "./Badge.mjs";
import Icon from "./Icon.mjs";
import { resolveIconName } from "../utils/iconUtils.mjs";
const { div, a, span, h4, h6, hr } = Bunnix;

export default function Sidebar({
  items,
  selection,
  onItemSelect,
  searchable = false,
  searchProps = {},
  leading,
  trailing,
  class: className = "",
} = {}) {
  const selectionState =
    selection &&
    typeof selection.map === "function" &&
    typeof selection.get === "function" &&
    typeof selection.set === "function"
      ? selection
      : null;
  const selected = selectionState ?? useState(selection ?? "home");
  const searchValue = useState("");

  const resolveItems = (value) => {
    const resolved =
      value && typeof value.get === "function" ? value.get() : value;
    return Array.isArray(resolved) ? resolved : [];
  };

  // Initialize expanded state from items' isExpanded property
  const initialExpanded = resolveItems(items).reduce((acc, item) => {
    if (item.children && item.isExpanded) {
      acc[item.id] = true;
    }
    return acc;
  }, {});

  const expanded = useState(initialExpanded);

  const handleClick = (id, href) => {
    selected.set(id);
    if (href !== null) {
      const target = href ?? `#${id}`;
      if (target && window?.location) {
        window.location.hash = target;
      }
    }
    if (onItemSelect) onItemSelect(id);
  };

  const toggleExpand = (id) => {
    const current = expanded.get();
    expanded.set({ ...current, [id]: !current[id] });
  };

  const renderItem = (item, isChild = false) => {
    const isSearching = (searchValue.get() ?? "").trim() !== "";
    if (item.isSeparator) {
      return div({ class: "py-xs px-base" }, hr({ class: "no-margin" }));
    }

    if (item.isHeader) {
      return div(
        { class: "row-container px-base py-sm pt-md select-none sticky-top" },
        span(
          {
            class:
              "no-margin text-tertiary text-sm bold text-uppercase no-selectable",
          },
          item.label,
        ),
      );
    }

    const hasChildren = item.children && item.children.length > 0;
    const isSelected = selected.map((v) => v === item.id);
    const isExpanded = useMemo([expanded, searchValue], (ex, query) =>
      String(query ?? "").trim() ? true : !!ex[item.id],
    );

    const handleItemClick = (e) => {
      if (hasChildren && !isSearching) {
        toggleExpand(item.id);
      } else {
        handleClick(item.id, item.href);
      }
    };

    return div({ class: "column-container" }, [
      div(
        { class: `box-sm no-selectable ${isChild ? "pl-md" : ""}` },
        div(
          {
            class: isSelected.map(
              (s) => `box-control hoverable ${s ? "selected" : ""}`,
            ),
            click: handleItemClick,
          },
          [
            div(
              { class: "row-container items-center gap-sm no-margin w-full" },
              [
                item.icon
                  ? (() => {
                      const iconName = resolveIconName(item.icon);
                      return Icon({
                        name: iconName,
                        fill: isSelected.map((s) => s ? "white" : "base")
                      });
                    })()
                  : null,
                h4({ class: "no-margin text-base font-inherit" }, item.label),
                item.badge || hasChildren ? div({ class: "spacer-h" }) : null,
                (() => {
                  if (!item.badge) return null;
                  if (
                    typeof item.badge === "string" ||
                    typeof item.badge === "number"
                  ) {
                    return Badge(
                      { tone: "accent", size: "xsmall", shape: "capsule" },
                      String(item.badge),
                    );
                  }
                  const value = item.badge.value;
                  if (value === undefined || value === null || value === "")
                    return null;
                  return Badge(
                    {
                      tone: item.badge.tone || "accent",
                      variant: item.badge.variant || "solid",
                      size: item.badge.size || "xsmall",
                      shape: "capsule",
                    },
                    String(value),
                  );
                })(),
                hasChildren &&
                  Icon({
                    name: "chevron-down",
                    fill: "base",
                    class: isExpanded.map(
                      (ex) =>
                        `ml-auto transition-transform ${ex ? "rotate-180" : ""}`,
                    ),
                  }),
              ],
            ),
          ],
        ),
      ),
      hasChildren &&
        Show(
          isExpanded,
          div(
            { class: "column-container py-xs" },
            item.children.map((child) => renderItem(child, true)),
          ),
        ),
    ]);
  };

  const filterSidebarItems = (rawItems, query) => {
    const list = Array.isArray(rawItems) ? rawItems : [];
    if (!query) return list;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return list;

    const filterItem = (item) => {
      if (item.isHeader || item.isSeparator) return item;
      const label = (item.label ?? "").toLowerCase();
      const hasChildren = item.children && item.children.length > 0;
      if (hasChildren) {
        const filteredChildren = item.children
          .map((child) => filterItem(child))
          .filter(Boolean);
        const matched =
          label.includes(normalized) || filteredChildren.length > 0;
        if (!matched) return null;
        return { ...item, children: filteredChildren };
      }
      return label.includes(normalized) ? item : null;
    };

    const result = [];
    let currentHeader = null;
    let currentGroup = [];
    const flush = () => {
      if (currentHeader) {
        if (currentGroup.length > 0) {
          result.push(currentHeader, ...currentGroup);
        }
      } else if (currentGroup.length > 0) {
        result.push(...currentGroup);
      }
      currentHeader = null;
      currentGroup = [];
    };

    for (const item of list) {
      if (item.isHeader) {
        flush();
        currentHeader = item;
        continue;
      }
      if (item.isSeparator) {
        if (currentGroup.length > 0) {
          currentGroup.push(item);
        }
        continue;
      }
      const filtered = filterItem(item);
      if (filtered) {
        currentGroup.push(filtered);
      }
    }
    flush();
    return result;
  };

  const filteredItems = useMemo([items, searchValue], (list, query) => {
    return filterSidebarItems(resolveItems(list), (query ?? "").trim());
  });

  const leadingContent = typeof leading === "function" ? leading() : leading;
  const trailingContent =
    typeof trailing === "function" ? trailing() : trailing;

  const content = [];
  if (searchable) {
    content.push(
      div(
        { class: "px-base py-xs" },
        SearchBox({
          placeholder: "Search",
          variant: "rounded",
          class: "w-full",
          value: searchValue.get(),
          onInput: (event) => {
            const value = event?.target?.value ?? "";
            searchValue.set(value);
          },
          ...searchProps,
        }),
      ),
    );
  }
  if (leadingContent) {
    content.push(div({ class: "px-base py-xs" }, leadingContent));
  }
  content.push(ForEach(filteredItems, "id", (item) => renderItem(item)));
  if (trailingContent) {
    content.push(div({ class: "px-base py-xs" }, trailingContent));
  }

  return div({ class: `sidebar ${className}` }, [
    div({ class: "column-container py-xs w-full h-full" }, content),
  ]);
}
