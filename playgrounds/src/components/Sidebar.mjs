import Bunnix, { useMemo, useState, ForEach, Show } from "@bunnix/core";
import SearchBox from "./SearchBox.mjs";
const { div, a, span, h4, h6, hr } = Bunnix;

export default function Sidebar({
  items = [],
  selection,
  onSelect,
  searchable = false,
  searchProps = {}
} = {}) {
  const selected = useState(selection ?? 'home');
  const searchValue = useState("");

  // Initialize expanded state from items' isExpanded property
  const initialExpanded = items.reduce((acc, item) => {
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
    if (onSelect) onSelect(id);
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
      return div({ class: "row-container px-base py-md select-none sticky-top" },
        h6({ class: "no-margin text-tertiary font-bold" }, item.label)
      );
    }

    const hasChildren = item.children && item.children.length > 0;
    const isSelected = selected.map(v => v === item.id);
    const isExpanded = useMemo(
      [expanded, searchValue],
      (ex, query) => (String(query ?? "").trim() ? true : !!ex[item.id])
    );

    const handleItemClick = (e) => {
      if (hasChildren && !isSearching) {
        toggleExpand(item.id);
      } else {
        handleClick(item.id, item.href);
      }
    };

    return div({ class: "column-container" }, [
      div({ class: `box-sm ${isChild ? "pl-md" : ""}` },
        div({
            class: isSelected.map(s => `box-control hoverable ${s ? 'selected' : ''}`),
            click: handleItemClick
          }, [
          div({ class: "row-container items-center gap-sm no-margin w-full" }, [
            span({ class: isSelected.map(s => `icon ${item.icon} ${s ? 'bg-white' : 'icon-base'}`) }),
            h4({ class: "no-margin text-base font-inherit" }, item.label),
            hasChildren && span({
              class: isExpanded.map(ex => `icon icon-chevron-down ml-auto transition-transform ${ex ? 'rotate-180' : 'icon-base'}`)
            })
          ])
        ])
      ),
      hasChildren && Show(isExpanded, div({ class: "column-container py-xs" },
        item.children.map(child => renderItem(child, true))
      ))
    ]);
  };

  const filterSidebarItems = (rawItems, query) => {
    if (!query) return rawItems;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rawItems;

    const filterItem = (item) => {
      if (item.isHeader || item.isSeparator) return item;
      const label = (item.label ?? "").toLowerCase();
      const hasChildren = item.children && item.children.length > 0;
      if (hasChildren) {
        const filteredChildren = item.children.map(child => filterItem(child)).filter(Boolean);
        const matched = label.includes(normalized) || filteredChildren.length > 0;
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

    for (const item of rawItems) {
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

  const filteredItems = useMemo(
    [items, searchValue],
    (list, query) => filterSidebarItems(list, (query ?? "").trim())
  );

  const content = [];
  if (searchable) {
    content.push(div({ class: "px-base py-xs" },
      SearchBox({
        placeholder: "Search",
        variant: "rounded",
        class: "w-full",
        value: searchValue.get(),
        input: (event) => {
          const value = event?.target?.value ?? "";
          searchValue.set(value);
        },
        ...searchProps
      })
    ));
  }
  content.push(ForEach(filteredItems, "id", (item) => renderItem(item)));

  return div({ class: "sidebar" }, [
    div({ class: "column-container py-xs" }, content),
  ]);
}
