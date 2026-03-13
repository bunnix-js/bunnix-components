import Bunnix from "@bunnix/core";
import { Heading, Text } from "../../../src/core/typography.mjs";
import { Column, Row, Spacer } from "../../../src/core/layout.mjs";
import { Icon } from "../../../src/core/media.mjs";
import { Table } from "../../../src/core/table.mjs";
import { Button } from "../../../src/core/buttons.mjs";
import { Code } from "../../../src/core/code.mjs";

export function TablePage() {
  const sampleData = [
    { name: "Alice", role: "Developer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Active" },
    { name: "Charlie", role: "Manager", status: "Inactive" },
  ];

  const headers = [
    { content: "Name", key: "name", size: 150 },
    { content: "Role", key: "role", size: 150 },
    { content: "Status", key: "status", size: 100 },
  ];

  const actionHeaders = [
    { content: "Name", key: "name", size: 150 },
    { content: "Role", key: "role", size: 150 },
    { content: "Actions", key: "actions", size: 120 },
  ];

  const showcaseCode = `
  import { Button, Icon, Row, Table, Text } from "@bunnix/components";

  const data = [
    { name: "Alice", role: "Developer", status: "Active" },
    { name: "Bob", role: "Designer", status: "Active" },
    { name: "Charlie", role: "Manager", status: "Inactive" },
  ];

  const headers = [
    { content: "Name", key: "name", size: 150 },
    { content: "Role", key: "role", size: 150 },
    { content: "Status", key: "status", size: 100 },
  ];

  Table({
    headers,
    border: "primary",
    rows: data,
  });

  Table({
    headers,
    rows: data,
    hideHeaders: true,
  });

  Table({
    headers,
    rows: data,
    renderCell: (record, rowIndex, field) => {
      if (field === "name") {
        return Text({ weight: "heavy" }, \`\${rowIndex + 1}. \${record.name}\`);
      }

      if (field === "role") {
        return Row(
          { gap: 8, alignItems: "center" },
          Icon({ name: "hammer", size: 16, color: "secondary" }),
          Text(record.role),
        );
      }

      if (field === "status") {
        return Text(
          {
            weight: "heavy",
            color: record.status === "Active" ? "success" : "secondary",
          },
          record.status,
        );
      }
    },
  });

  Table({
    headers: [
      { content: "Name", key: "name", size: 150 },
      { content: "Role", key: "role", size: 150 },
      { content: "Actions", key: "actions", size: 120 },
    ],
    border: "none",
    hideHeaders: true,
    rows: data,
    renderCell: (record, rowIndex, field) => {
      if (field === "actions") {
        return Row(
          { gap: 8, alignItems: "center" },
          Button(
            { variant: "tertiary", padding: false, minWidth: 32 },
            Icon({ name: "pencil", size: 16, color: "secondary" }),
          ),
          Button(
            { variant: "danger", padding: false, minWidth: 32 },
            Icon({ name: "trash", size: 16 }),
          ),
        );
      }
    },
  });
  `;

  return Column(
    Heading({ h2: true }, "Table Component"),
    Heading(
      { h4: true, color: "secondary", weight: "heavy" },
      "Data table component for displaying structured data",
    ),
    Spacer({ minHeight: 24 }),

    Row(
      { border: "primary", radius: "large", overflow: "hidden", alignItems: "stretch", alignItems: "start" },
      Column(
        { width: "50%", padding: "large", gap: "regular", flexShrink: 0 },
        Heading({ h3: true, color: "secondary" }, "Table"),
        Text("Data table with column headers, optional hidden headers, and custom cell rendering."),
        Spacer({ minHeight: 8 }),
        Column(
          { gap: 24, fillWidth: true },
          Column(
            { gap: "small" },
            Text({ color: "secondary", weight: "heavy" }, "Default"),
            Table({
              headers,
              border: "primary",
              rows: sampleData,
            }),
          ),
          Column(
            { gap: "small" },
            Text({ color: "secondary", weight: "heavy" }, "Hidden Headers"),
            Table({
              headers,
              border: "secondary",
              hideHeaders: true,
              rows: sampleData,
            }),
          ),
          Column(
            { gap: "small" },
            Text({ color: "secondary", weight: "heavy" }, "Custom Cells"),
            Table({
              headers,
              border: "primary",
              rows: sampleData,
              renderCell: (record, rowIndex, field) => {
                if (field === "name") {
                  return Text({ weight: "heavy" }, `${rowIndex + 1}. ${record.name}`);
                }

                if (field === "role") {
                  return Row(
                    { gap: 8, alignItems: "center" },
                    Icon({ name: "hammer", size: 16, color: "secondary" }),
                    Text(record.role),
                  );
                }

                if (field === "status") {
                  return Text(
                    {
                      weight: "heavy",
                      color: record.status === "Active" ? "success" : "secondary",
                    },
                    record.status,
                  );
                }
              },
            }),
          ),
          Column(
            { gap: "small" },
            Text({ color: "secondary", weight: "heavy" }, "Borderless Actions"),
            Table({
              headers: actionHeaders,
              border: "none",
              hideHeaders: true,
              rows: sampleData,
              renderCell: (record, rowIndex, field) => {
                if (field === "actions") {
                  return Row(
                    { gap: 8, alignItems: "center" },
                    Button(
                      { variant: "tertiary", padding: false, minWidth: 32 },
                      Icon({ name: "pencil", size: 16, color: "secondary" }),
                    ),
                    Button(
                      { variant: "danger", padding: false, minWidth: 32 },
                      Icon({ name: "trash", size: 16 }),
                    ),
                  );
                }
              },
            }),
          ),
        ),
      ),
      Code(
        {
          bg: "primary-dimmed",
          width: "50%",
          padding: "large",
          language: "js",
        },
        showcaseCode,
      ),
    ),
  );
}
