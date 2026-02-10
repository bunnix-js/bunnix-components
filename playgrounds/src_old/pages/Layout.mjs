import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Container } from "@bunnix/components";
const { div, h5, p, span, hr } = Bunnix;

const ClassExample = (className, description, exampleContent) => {
  return div({ class: "column-container gap-sm" }, [
    div({ class: "row-container gap-sm items-center" }, [
        span({ class: "text-mono text-sm bg-dimmed text-primary p-xs rounded-sm" }, `.${className}`),
        span({ class: "text-secondary text-sm" }, description)
    ]),
    div({ class: "box w-fit w-300 bg-alternate rounded" }, [
        exampleContent || div({ class: `${className} bg-highlight p-sm w-full border-dashed rounded` }, "Content")
    ])
  ]);
};

export default function LayoutPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Layout", 
      description: "Utility classes for structuring the application layout." 
    }),
    
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Containers & Flex", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          ClassExample("main-container", "Full-screen app shell (100dvh, flex)."),
          ClassExample("column-container", "Flex column direction.", 
              div({ class: "column-container gap-sm bg-highlight p-sm w-full" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" })
              ])
          ),
          ClassExample("row-container", "Flex row direction.", 
              div({ class: "row-container gap-sm bg-highlight p-sm w-full" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" })
              ])
          ),
          ClassExample("grid-flow", "Responsive flex wrap grid.", 
              div({ class: "grid-flow gap-sm w-full" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" })
              ])
          ),
        ])
      ]),

      PageSection({ title: "Boxes & Shapes", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          ClassExample("box", "Standard padded flex box."),
          ClassExample("box-sm", "Smaller padding flex box."),
          ClassExample("box-capsule", "Rounded capsule shape.", 
              div({ class: "box-capsule bg-highlight border-solid" }, "Capsule Content")
          ),
          div({ class: "column-container gap-sm" }, [
              div({ class: "row-container gap-sm items-center" }, [
                  span({ class: "text-mono text-sm bg-dimmed text-primary p-xs rounded-sm" }, ".card"),
                  span({ class: "text-secondary text-sm" }, "Bordered container with radius.")
              ]),
              div({ class: "card box w-300 bg-highlight" }, "Card Content")
          ]),
        ])
      ]),

      PageSection({ title: "Spacing & Alignment", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          ClassExample("gap-xs", "Extra small gap (0.5x base).", 
              div({ class: "row-container gap-xs w-full bg-highlight p-sm" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" })
              ])
          ),
          ClassExample("gap-sm", "Small/Base gap (1x base).", 
              div({ class: "row-container gap-sm w-full bg-highlight p-sm" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" })
              ])
          ),
          ClassExample("gap-md", "Medium gap (2x base).", 
              div({ class: "row-container gap-md w-full bg-highlight p-sm" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" })
              ])
          ),
          ClassExample("gap-lg", "Large gap (3x base).", 
              div({ class: "row-container gap-lg w-full bg-highlight p-sm" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  div({ class: "bg-accent w-40 h-40 rounded" })
              ])
          ),
          ClassExample("spacer-h", "Horizontal spacer (flex: 1).", 
              div({ class: "row-container w-full bg-highlight p-sm" }, [
                  div({ class: "bg-accent p-xs rounded text-white text-sm" }, "Left"),
                  div({ class: "spacer-h" }),
                  div({ class: "bg-accent p-xs rounded text-white text-sm" }, "Right")
              ])
          ),
          ClassExample("items-center", "Align items center (vertical in row).", 
              div({ class: "row-container items-center gap-md bg-highlight p-sm w-full" }, [
                  div({ class: "bg-accent w-40 h-40 rounded" }),
                  span("Centered Text")
              ])
          ),
        ])
      ]),

      PageSection({ title: "Sizing Utilities", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          ClassExample("w-fit", "Width: fit-content.", 
              div({ class: "bg-highlight p-sm w-full" }, [
                  div({ class: "w-fit bg-accent p-xs rounded text-white" }, "I only take as much space as I need")
              ])
          ),
          ClassExample("shrink-0", "Prevents element from shrinking.", 
              div({ class: "row-container bg-highlight p-sm w-150 overflow-hidden gap-sm" }, [
                  div({ class: "shrink-0 bg-accent p-xs rounded text-white" }, "Fixed Size"),
                  div({ class: "whitespace-nowrap" }, "Long text that would squash me")
              ])
          ),
          ClassExample("no-margin", "Removes margins (Comparison below).", 
              div({ class: "row-container gap-md" }, [
                  div({ class: "column-container gap-sm items-center" }, [
                      div({ class: "border-dashed rounded bg-alternate p-0" }, [
                          div({ class: "m-md bg-accent p-xs rounded text-white" }, "With .m-md")
                      ]),
                      span({ class: "text-sm text-secondary" }, "Has Margin")
                  ]),
                  div({ class: "column-container gap-sm items-center" }, [
                      div({ class: "border-dashed rounded bg-alternate p-0" }, [
                          div({ class: "no-margin bg-accent p-xs rounded text-white" }, "With .no-margin")
                      ]),
                      span({ class: "text-sm text-secondary" }, "Flush (No Margin)")
                  ])
              ])
          ),
        ])
      ]),

      PageSection({ title: "Borders & Overflow", stickyOffset: headerOffset }, [
        div({ class: "grid-flow gap-md" }, [
          ClassExample("border-solid", "Solid 1px border."),
          ClassExample("border-dashed", "Dashed 1px border."),
          ClassExample("rounded", "Base border radius."),
          ClassExample("rounded-sm", "Small border radius."),
          ClassExample("overflow-hidden", "Hides overflow content.", 
              div({ class: "bg-highlight p-sm w-150 overflow-hidden h-40" }, [
                  div("I am overflowing content that will be clipped")
              ])
          ),
          ClassExample("overflow-auto", "Scrolls overflow content.", 
              div({ class: "bg-highlight p-sm w-150 overflow-auto h-40" }, [
                  div("I am overflowing content that will scroll. I am overflowing content that will scroll.")
              ])
          ),
        ])
      ]),
    ])
  ]);
}
