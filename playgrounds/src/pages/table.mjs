import Bunnix from "@bunnix/core";
import { Heading, Text2 } from "../../../src/core/typography.mjs";
import { Column, Spacer } from "../../../src/core/layout.mjs";
import { Table2 } from "../../../src/core/table.mjs";
import { ComponentShowcase } from "../reusable/ComponentShowcase.mjs";

export function TablePage() {
  const sampleData = [
    { name: "Alice", role: "Developer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Active" },
    { name: "Charlie", role: "Manager", status: "Inactive" },
  ];

  return Column(
    Heading({ h2: true }, "Table Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Data table component for displaying structured data",
    ),
    Spacer({ minHeight: 24 }),
    
    // Table2 Component
    ComponentShowcase(
      {
        code: `
        import { Table2 } from "@bunnix/components";

        const data = [
          { name: "Alice", role: "Developer", status: "Active" },
          { name: "Bob", role: "Designer", status: "Active" },
          { name: "Charlie", role: "Manager", status: "Inactive" },
        ];

        Table2({
          headers: [
            { content: "Name", key: "name", size: 150 },
            { content: "Role", key: "role", size: 150 },
            { content: "Status", key: "status", size: 100 },
          ],
          rows: data,
        });
        `,
      },
      Heading({ h3: true, color: "secondary" }, "Table2"),
      Text2("Data table with column headers and row rendering from structured data."),
      Spacer({ minHeight: 8 }),
      Table2({
        headers: [
          { content: "Name", key: "name", size: 150 },
          { content: "Role", key: "role", size: 150 },
          { content: "Status", key: "status", size: 100 },
        ],
        rows: sampleData,
      }),
    ),
  );
}
