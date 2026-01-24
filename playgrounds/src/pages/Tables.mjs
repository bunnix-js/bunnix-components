import Bunnix from "@bunnix/core";
const { div, h1, h5, p, span, hr, table, thead, tbody, tr, th, td } = Bunnix;

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
            span({ class: "bg-secondary p-xs rounded-sm text-white text-sm" }, "Offline")
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
  return div({ class: "column-container page-layout" }, [
    h1("Tables"),
    p("Data display components."),
    hr(),
    
    div({ class: "column-container gap-md" }, [
      div({ class: "column-container gap-sm" }, [
        h5("Default (Clean)"),
        SampleTable()
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("With Background (.table-bg)"),
        SampleTable("table-bg")
      ]),

      div({ class: "column-container gap-sm" }, [
        h5("Bordered (.table-bordered)"),
        SampleTable("table-bordered")
      ]),

      hr(),
      h5("Interactive Modifiers"),
      
      div({ class: "column-container gap-sm" }, [
        h5("Hover Rows (.table-hover-rows)"),
        p("Highlights the row under the cursor."),
        SampleTable("table-hover-rows")
      ]),
    ])
  ]);
}