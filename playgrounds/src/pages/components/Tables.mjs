import Bunnix, { useState } from "@bunnix/core";
import PageHeader from "../../components/PageHeader.mjs";
import PageSection from "../../components/PageSection.mjs";
import Table from "../../components/Table.mjs";
import Text from "../../components/Text.mjs";
import InputField from "../../components/InputField.mjs";
import VStack from "../../components/VStack.mjs";
import Badge from "../../components/Badge.mjs";
import Container from "../../components/Container.mjs";

const { div, h5, p, span } = Bunnix;

export default function TablesComponentPage() {
  const headerOffset = "6rem";
  const searchText = useState("");
  const selectedKeys = useState([]);

  const columns = [
    { field: "name", size: "auto", label: "Name" },
    { field: "role", size: "30%", label: "Role" },
    { field: "location", size: "20%", label: "Location" },
    { field: "status", size: 140, label: "Status" }
  ];

  const data = [
    { id: "ada-lovelace", name: "Ada Lovelace", role: "Mathematician", location: "London, UK", status: "Active" },
    { id: "alan-turing", name: "Alan Turing", role: "Computer Scientist", location: "Wilmslow, UK", status: "Offline" },
    { id: "grace-hopper", name: "Grace Hopper", role: "Rear Admiral", location: "New York, USA", status: "On Leave" }
  ];

  const renderStatus = (_columnIndex, field, row) => {
    if (field !== "status") return undefined;
    const tone = row.status === "Active"
      ? "success"
      : row.status === "On Leave"
        ? "accent"
        : "dimmed";
    const variant = row.status === "Offline" ? "soft" : "solid";
    return Badge({ tone, variant, size: "xs" }, row.status);
  };

  return Container({ type: "page", direction: "vertical" }, [
    PageHeader({
      title: "Table",
      description: "Composable data tables with column sizing, variants, and custom cell rendering."
    }),

    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Default Rendering", stickyOffset: headerOffset }, [
        p("Columns map to fields and render their corresponding values by default."),
        VStack({ alignment: "leading", gap: "regular" }, [
          div({ class: "w-300" }, [
            InputField({
              type: "search",
              label: "Search by name",
              placeholder: "Type a name...",
              value: searchText,
              input: (e) => searchText.set(e.target.value)
            })
          ]),
          Table({
            columns,
            data,
            key: "id",
            renderCell: renderStatus,
            searchable: { field: "name", searchText },
            sortable: [
              { field: "name", sortType: "string", sorted: true },
              { field: "role", sortType: "string" },
              { field: "location", sortType: "string" },
              { field: "status", sortType: "string" }
            ]
          })
        ])
      ]),

      PageSection({ title: "Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "Background"),
            Table({ columns, data, key: "id", renderCell: renderStatus, variant: "background" })
          ]),
          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "Bordered"),
            Table({
              columns,
              data,
              key: "id",
              renderCell: renderStatus,
              variant: "bordered",
              selection: (keys) => selectedKeys.set(keys)
            }),
            Text({ type: "paragraph", color: "secondary", class: "no-margin" },
              selectedKeys.map((keys) => {
                if (!keys.length) return "Selected: none";
                const names = data.filter((row) => keys.includes(row.id)).map((row) => row.name).join(", ");
                return `Selected: ${names}`;
              })
            )
          ])
        ])
      ]),

      PageSection({ title: "Interactive Rows", stickyOffset: headerOffset }, [
        p("Use interactive for hoverable rows with a pointer cursor."),
        Table({ columns, data, key: "id", renderCell: renderStatus, interactive: true })
      ])
    ])
  ]);
}
