import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Spacer, Grid2 } from "../../../src/core/layout.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

const { div } = Bunnix;

export function GridPage() {
  // Helper for demo boxes
  const DemoBox = (text) => div(
    { 
      style: { 
        padding: "12px", 
        backgroundColor: "var(--color-bg-secondary)", 
        borderRadius: "6px",
        border: "1px solid var(--color-border-primary)",
        textAlign: "center",
      } 
    },
    Text2(text)
  );

  return Column(
    Heading({ h2: true }, "Grid Layout"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "CSS Grid-based layout component for complex layouts",
    ),
    Spacer({ minHeight: 24 }),
    
    // Fixed Layout
    ComponentShowcase(
      {
        code: `
        import { Grid2 } from "@bunnix/components";

        // Fixed column layout
        Grid2(
          {
            columns: [
              { size: 200 },
              { size: "auto" },
            ],
          },
          DemoBox("Sidebar (200px)"),
          DemoBox("Content (auto)")
        );

        // Three column layout
        Grid2(
          {
            columns: [
              { size: "1fr" },
              { size: "2fr" },
              { size: "1fr" },
            ],
          },
          DemoBox("Column 1"),
          DemoBox("Column 2 (2x)"),
          DemoBox("Column 3")
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Fixed Layout"),
      Text2("Grid with fixed column templates. Columns can be sized with pixels, fractions, or auto."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Column(
          { gap: "small" },
          Text2({ color: "secondary" }, "Two columns (200px + auto):"),
          Grid2(
            {
              columns: [
                { size: 200 },
                { size: "auto" },
              ],
            },
            DemoBox("Sidebar"),
            DemoBox("Content"),
          ),
        ),
        Column(
          { gap: "small" },
          Text2({ color: "secondary" }, "Three columns (1fr + 2fr + 1fr):"),
          Grid2(
            {
              columns: [
                { size: "1fr" },
                { size: "2fr" },
                { size: "1fr" },
              ],
            },
            DemoBox("Column 1"),
            DemoBox("Column 2 (2x wider)"),
            DemoBox("Column 3"),
          ),
        ),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // Flow Layout
    ComponentShowcase(
      {
        code: `
        import { Grid2 } from "@bunnix/components";

        // Flow layout (wraps like flexbox)
        Grid2(
          {
            layout: "flow",
            gridGap: 12,
          },
          DemoBox("Item 1"),
          DemoBox("Item 2"),
          DemoBox("Item 3"),
          DemoBox("Item 4"),
          DemoBox("Item 5"),
          DemoBox("Item 6"),
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Flow Layout"),
      Text2("Flow layout wraps items like flexbox, useful for responsive card grids."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text2({ color: "secondary" }, "Items wrap automatically:"),
        Grid2(
          {
            layout: "flow",
            gridGap: 12,
          },
          DemoBox("Item 1"),
          DemoBox("Item 2"),
          DemoBox("Item 3"),
          DemoBox("Item 4"),
          DemoBox("Item 5"),
          DemoBox("Item 6"),
          DemoBox("Item 7"),
          DemoBox("Item 8"),
        ),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // Gap Spacing
    ComponentShowcase(
      {
        code: `
        import { Grid2 } from "@bunnix/components";

        // Custom gap spacing
        Grid2(
          {
            columns: [
              { size: "1fr" },
              { size: "1fr" },
              { size: "1fr" },
            ],
            gridGap: 24, // pixels
          },
          DemoBox("Item 1"),
          DemoBox("Item 2"),
          DemoBox("Item 3")
        );

        // Using gap prop (alias)
        Grid2(
          {
            columns: [
              { size: "1fr" },
              { size: "1fr" },
            ],
            gap: "large", // CSS variable
          },
          DemoBox("Item 1"),
          DemoBox("Item 2")
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Gap Spacing"),
      Text2("Control spacing between grid items with gridGap or gap prop (supports pixels or CSS values)."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Column(
          { gap: "small" },
          Text2({ color: "secondary" }, "Small gap (6px):"),
          Grid2(
            {
              columns: [
                { size: "1fr" },
                { size: "1fr" },
                { size: "1fr" },
              ],
              gridGap: 6,
            },
            DemoBox("Item 1"),
            DemoBox("Item 2"),
            DemoBox("Item 3"),
          ),
        ),
        Column(
          { gap: "small" },
          Text2({ color: "secondary" }, "Large gap (24px):"),
          Grid2(
            {
              columns: [
                { size: "1fr" },
                { size: "1fr" },
                { size: "1fr" },
              ],
              gridGap: 24,
            },
            DemoBox("Item 1"),
            DemoBox("Item 2"),
            DemoBox("Item 3"),
          ),
        ),
      ),
    ),
    
    Spacer({ minHeight: 16 }),
    
    // Complex Layouts
    ComponentShowcase(
      {
        code: `
        import { Grid2 } from "@bunnix/components";

        // Dashboard layout example
        Grid2(
          {
            columns: [
              { size: 250 },     // Sidebar
              { size: "auto" },  // Main content
              { size: 200 },     // Right panel
            ],
            gridGap: 16,
          },
          Sidebar(),
          MainContent(),
          RightPanel()
        );

        // Responsive card grid
        Grid2(
          {
            columns: [
              { size: "1fr" },
              { size: "1fr" },
              { size: "1fr" },
              { size: "1fr" },
            ],
            gap: 16,
          },
          ...cards.map(card => Card(card))
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Complex Layouts"),
      Text2("Grid2 supports complex multi-column layouts for dashboards, sidebars, and more."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text2({ color: "secondary" }, "Three-panel layout:"),
        Grid2(
          {
            columns: [
              { size: 120 },
              { size: "auto" },
              { size: 120 },
            ],
            gridGap: 12,
          },
          DemoBox("Sidebar"),
          div(
            { 
              style: { 
                padding: "24px", 
                backgroundColor: "var(--color-bg-secondary)", 
                borderRadius: "6px",
                border: "1px solid var(--color-border-primary)",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              } 
            },
            Text2("Main Content Area")
          ),
          DemoBox("Panel"),
        ),
      ),
    ),
  );
}
