import Bunnix from "@bunnix/core";
import PageHeader from "../components/PageHeader.mjs";
import PageSection from "../components/PageSection.mjs";
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
            span({ class: "bg-success p-xs rounded-sm text-white text-sm" }, "Active")
        ])
      ]),
      tr([
        td("Jane Smith"),
        td("Designer"),
        td([
            span({ class: "bg-dimmed p-xs rounded-sm text-primary text-sm" }, "Offline")
        ])
      ]),
      tr([
        td("Bob Johnson"),
        td("Manager"),
        td([
            span({ class: "bg-accent p-xs rounded-sm text-white text-sm" }, "On Leave")
        ])
      ])
    ])
  ]);
};

export default function TablesPage() {
  const headerOffset = "6rem";

  return div({ class: "column-container page-layout" }, [
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