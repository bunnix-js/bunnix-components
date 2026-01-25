import Bunnix, { useState } from "@bunnix/core";
const { div, a, span, h4 } = Bunnix;

export default function Sidebar({ items = [], selection, onSelect } = {}) {
  const selected = useState(selection ?? 'home');

  const handleClick = (id) => {
    selected.set(id);
    if (onSelect) onSelect(id);
  };

  const renderItem = (item) => {
    const isSelected = selected.map(v => v === item.id);

    return div({ class: "box-sm" },
      div({
          class: isSelected.map(s => `box-capsule hoverable ${s ? 'selected' : ''}`),
          click: () => handleClick(item.id)
        },
        a({ class: "link-flat", href: `#${item.id}`, click: () => handleClick(item.id) }, [
          span({ class: isSelected.map(s => `icon ${item.icon} ${s ? 'bg-white' : 'bg-base'}`) }),
          h4({ class: "no-margin text-base font-inherit" }, item.label)
        ])
      ),
    );
  };

  return div({ class: "sidebar" }, [
    div({ class: "column-container py-xs" }, 
      items.map(item => renderItem(item))
    ),
  ]);
}
