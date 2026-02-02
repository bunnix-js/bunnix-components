import Bunnix from "@bunnix/core";
import { PageHeader } from "@bunnix/components";
import { PageSection } from "@bunnix/components";
import { Badge } from "@bunnix/components";
import { Container } from "@bunnix/components";
const { div, h5, p, span, hr, table, thead, tbody, tr, th, td } = Bunnix;

const SampleTable = (className = "") => {
  return table({ class: `table ${className}` }, [
    thead([
      tr([
        th("Name"),
        th("Role"),
        th("Status")
      ])
    ]),
    tbody([
      tr([
        td("John Doe"),
        td("Developer"),
        td([
            Badge({ tone: "success", size: "xs" }, "Active")
        ])
      ]),
      tr([
        td("Jane Smith"),
        td("Designer"),
        td([
            Badge({ tone: "dimmed", variant: "soft", size: "xs" }, "Offline")
        ])
      ]),
      tr([
        td("Bob Johnson"),
        td("Manager"),
        td([
            Badge({ tone: "accent", size: "xs" }, "On Leave")
        ])
      ])
    ])
  ]);
};

export default function TablesPage() {
  const headerOffset = "6rem";

  return Container({ type: "page", direction: "column" }, [
    PageHeader({ 
      title: "Tables", 
      description: "Data display components for structured information." 
    }),
    
    div({ class: "column-container gap-md" }, [
      PageSection({ title: "Visual Variants", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-md" }, [
          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "Default (Clean)"),
            SampleTable()
          ]),

          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "With Background (.table-bg)"),
            SampleTable("table-bg")
          ]),

          div({ class: "column-container gap-sm" }, [
            h5({ class: "text-tertiary text-sm" }, "Bordered (.table-bordered)"),
            SampleTable("table-bordered")
          ]),
        ])
      ]),

      PageSection({ title: "Interactive Modifiers", stickyOffset: headerOffset }, [
        div({ class: "column-container gap-sm" }, [
          h5({ class: "text-tertiary text-sm" }, "Hover Rows (.table-hover-rows)"),
          p("Highlights the row under the cursor."),
          SampleTable("table-hover-rows")
        ])
      ]),
    ])
  ]);
}
