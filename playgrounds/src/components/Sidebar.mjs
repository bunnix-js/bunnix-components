import Bunnix, { useState, Show } from "@bunnix/core";
const { div, a, span, h4, h6, hr } = Bunnix;

export default function Sidebar({ items = [], selection, onSelect } = {}) {
  const selected = useState(selection ?? 'home');
  
  // Initialize expanded state from items' isExpanded property
  const initialExpanded = items.reduce((acc, item) => {
    if (item.children && item.isExpanded) {
      acc[item.id] = true;
    }
    return acc;
  }, {});
  
  const expanded = useState(initialExpanded);

  const handleClick = (id) => {
    selected.set(id);
    if (onSelect) onSelect(id);
  };

  const toggleExpand = (id) => {
    const current = expanded.get();
    expanded.set({ ...current, [id]: !current[id] });
  };

  const renderItem = (item, isChild = false) => {
    if (item.isSeparator) {
      return div({ class: "py-xs px-base" }, hr({ class: "no-margin" }));
    }

    if (item.isHeader) {
      return div({ class: "px-base py-md select-none" }, 
        h6({ class: "no-margin text-tertiary font-bold" }, item.label)
      );
    }

    const hasChildren = item.children && item.children.length > 0;
    const isSelected = selected.map(v => v === item.id);
    const isExpanded = expanded.map(ex => !!ex[item.id]);

    const handleItemClick = (e) => {
      if (hasChildren) {
        toggleExpand(item.id);
      } else {
        handleClick(item.id);
      }
    };

    return div({ class: "column-container" }, [
      div({ class: `box-sm ${isChild ? "pl-md" : ""}` },
        div({
            class: isSelected.map(s => `box-capsule hoverable ${s ? 'selected' : ''}`),
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

  return div({ class: "sidebar" }, [
    div({ class: "column-container py-xs" }, 
      items.map(item => renderItem(item))
    ),
  ]);
}
