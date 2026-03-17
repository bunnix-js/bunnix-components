import Bunnix from "@bunnix/core";
import { Heading, Text, Column, Row, Spacer } from "@bunnix/components";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

const { div } = Bunnix;

function DemoBox(text) {
  return div(
    {
      style: {
        padding: "12px",
        backgroundColor: "var(--color-bg-secondary)",
        borderRadius: "6px",
        border: "1px solid var(--color-border-primary)",
      },
    },
    Text(text),
  );
}

export function ColumnPage() {
  return Column(
    Heading({ h2: true }, "Column Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Column container for stacking children vertically",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Column } from "@bunnix/components";

        // Basic column
        Column(child1, child2, child3);

        // With custom gap
        Column(
          { gap: "large" },
          child1,
          child2,
          child3
        );

        // With alignment
        Column(
          { alignItems: "center" },
          child1,
          child2
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Column"),
      Text("Column container for stacking children vertically with automatic gap spacing."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text({ color: "secondary" }, "Default gap:"),
        Column(
          { border: "primary", radius: "regular", padding: "regular" },
          DemoBox("Item 1"),
          DemoBox("Item 2"),
          DemoBox("Item 3"),
        ),
      ),
    ),
  );
}

export function RowPage() {
  return Column(
    Heading({ h2: true }, "Row Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Row container for arranging children horizontally",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Row } from "@bunnix/components";

        // Basic row
        Row(child1, child2, child3);

        // With custom gap
        Row(
          { gap: "large" },
          child1,
          child2,
          child3
        );

        // With alignment
        Row(
          { alignItems: "start" },
          child1,
          child2
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Row"),
      Text("Row container for arranging children horizontally with automatic gap spacing."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "small" },
        Text({ color: "secondary" }, "Default gap:"),
        Row(
          { border: "primary", radius: "regular", padding: "regular" },
          DemoBox("Item 1"),
          DemoBox("Item 2"),
          DemoBox("Item 3"),
        ),
      ),
    ),
  );
}

export function SpacerPage() {
  return Column(
    Heading({ h2: true }, "Spacer Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Flexible spacing for rows and columns",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Column, Row, Spacer } from "@bunnix/components";

        // Vertical spacing in Column
        Column(
          child1,
          Spacer({ minHeight: 24 }),
          child2
        );

        // Horizontal spacing in Row
        Row(
          child1,
          Spacer(), // grows to fill space
          child2
        );

        // Fixed horizontal space
        Row(
          child1,
          Spacer({ minWidth: 50 }),
          child2
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Spacer"),
      Text("Flexible spacer component for controlling spacing between elements."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Column(
          { gap: "small" },
          Text({ color: "secondary" }, "Vertical spacing in Column:"),
          Column(
            { border: "primary", radius: "regular", padding: "regular" },
            DemoBox("Item 1"),
            Spacer({ minHeight: 24 }),
            DemoBox("Item 2 (24px space above)"),
          ),
        ),
        Column(
          { gap: "small" },
          Text({ color: "secondary" }, "Horizontal spacing in Row:"),
          Row(
            { border: "primary", radius: "regular", padding: "regular" },
            DemoBox("Left"),
            Spacer(),
            DemoBox("Right (auto space)"),
          ),
        ),
      ),
    ),
  );
}

export function AlignmentPage() {
  return Column(
    Heading({ h2: true }, "Alignment"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Control how children align inside rows and columns",
    ),
    Spacer({ minHeight: 24 }),
    ComponentShowcase(
      {
        code: `
        import { Column, Row } from "@bunnix/components";

        // Column alignment
        Column(
          { alignItems: "start" },
          child1,
          child2
        );

        Column(
          { alignItems: "center" },
          child1,
          child2
        );

        Column(
          { alignItems: "end" },
          child1,
          child2
        );

        // Row alignment
        Row(
          { alignItems: "start" },
          child1,
          child2
        );

        Row(
          { alignItems: "center" },
          child1,
          child2
        );

        Row(
          { alignItems: "end" },
          child1,
          child2
        );
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Alignment"),
      Text("Control how children are aligned within Column and Row containers."),
      Spacer({ minHeight: 8 }),
      Column(
        { gap: "regular" },
        Column(
          { gap: "small" },
          Text({ color: "secondary" }, "Column alignments:"),
          Row(
            { gap: "regular" },
            Column(
              { border: "primary", radius: "regular", padding: "regular", alignItems: "start", minHeight: 100 },
              DemoBox("Start"),
              DemoBox("Aligned"),
            ),
            Column(
              { border: "primary", radius: "regular", padding: "regular", alignItems: "center", minHeight: 100 },
              DemoBox("Center"),
              DemoBox("Aligned"),
            ),
            Column(
              { border: "primary", radius: "regular", padding: "regular", alignItems: "end", minHeight: 100 },
              DemoBox("End"),
              DemoBox("Aligned"),
            ),
          ),
        ),
        Column(
          { gap: "small" },
          Text({ color: "secondary" }, "Row alignments:"),
          Column(
            { gap: "small" },
            Row(
              { border: "primary", radius: "regular", padding: "regular", alignItems: "start", minHeight: 80 },
              DemoBox("Start"),
              div({ style: { padding: "24px 12px" } }, Text("Taller")),
              DemoBox("Aligned"),
            ),
            Row(
              { border: "primary", radius: "regular", padding: "regular", alignItems: "center", minHeight: 80 },
              DemoBox("Center"),
              div({ style: { padding: "24px 12px" } }, Text("Taller")),
              DemoBox("Aligned"),
            ),
            Row(
              { border: "primary", radius: "regular", padding: "regular", alignItems: "end", minHeight: 80 },
              DemoBox("End"),
              div({ style: { padding: "24px 12px" } }, Text("Taller")),
              DemoBox("Aligned"),
            ),
          ),
        ),
      ),
    ),
  );
}
