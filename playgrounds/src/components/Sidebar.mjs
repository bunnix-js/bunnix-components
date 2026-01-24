import Bunnix, { useState } from "@bunnix/core";
const { div, a, span, hr, h4 } = Bunnix;

export default function Sidebar({ selection, onSelect } = {}) {
  const selected = useState(selection ?? 'home');

  const handleClick = (id) => {
    selected.set(id);
    if (onSelect) onSelect(id);
  };

  const renderItem = (id, label) => {
    const isSelected = selected.map(v => v === id);

    return div({ class: "box-sm" },
      div({
          class: isSelected.map(s => `box-capsule hoverable ${s ? 'selected' : ''}`),
          click: () => handleClick(id)
        },
        a({ class: "link-flat", href: `#${id}`, click: () => handleClick(id) }, [
          h4({ style: "margin: 0; font-size: inherit; font-weight: inherit;" }, label)
        ])
      ),
    );
  };


  return div({ class: "sidebar" }, [
    div(
      { class: "box hoverable" },
      a({ class: "link-flat", href: "#" }, [span({ class: "icon icon-person" }), "Profile"]),
    ),
    hr(),
    div({ class: "column-container" }, [
      renderItem('typography', 'Typography'),
      renderItem('colors', 'Colors'),
      renderItem('layout', 'Layout'),
      renderItem('controls', 'Controls'),
      renderItem('buttons', 'Buttons'),
      renderItem('tables', 'Tables'),
      renderItem('links', 'Links'),
      renderItem('media', 'Media'),
    ]),
  ]);
}
