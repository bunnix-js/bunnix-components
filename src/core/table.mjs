/**
 * Table Components (Next-Gen Core)
 *
 * Data table primitives for displaying structured data.
 *
 * Components:
 * - Table2: Data table with column headers and row rendering
 *
 * Features:
 * - Automatic style extraction (width, height, gap, margins, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Column-based data mapping with headers array (content, key, size)
 * - Row rendering from data objects mapped to header keys
 */
import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { table, colgroup, col, thead, tbody, tr, td } = Bunnix;

const TableCore = withNormalizedArgs((props, ...children) => {
  return withExtractedStyles((finalProps, ...children) => {
    let headers = finalProps.headers ?? [];
    let rows = finalProps.rows ?? [];

    delete finalProps.headers;
    delete finalProps.rows;

    let tcols = headers.map((h) => col({ width: h.size ?? 0 }));

    let theaders = headers.map((h) =>
      td({
        style: {
          fontWeight: "var(--font-weight-heavy)",
          padding: "var(--padding-sm) var(--padding-md)",
          borderBottom: "1px solid var(--color-border-primary)",
        }
      }, h.content ?? "")
    );

    let trows = rows.map((r, rowIndex) =>
      tr(
        headers.map((h) => {
          const isLastRow = rowIndex === rows.length - 1;
          const cellStyle = {
            padding: "var(--padding-sm) var(--padding-md)",
            borderBottom: isLastRow ? "none" : "1px solid var(--color-border-primary)",
          };

          if (!h.key) return td({ style: cellStyle }, "");
          if (!(h.key in r)) return td({ style: cellStyle }, "");
          return td({ style: cellStyle }, r[h.key]);
        }),
      ),
    );

    return table(
      {
        class: "table",
        ...finalProps,
        style: {
          ...finalProps.style,
          borderCollapse: "separate",
          borderSpacing: 0,
          textAlign: "left",
          verticalAlign: "middle",
        },
      },
      colgroup(tcols),
      thead(theaders),
      tbody(trows),
    );
  })(props, ...children);
});

// Apply default Table2 props at export
export const Table2 = (props = {}, ...children) => {
  const propsWithDefaults = { fillWidth: true, ...props };
  return TableCore(propsWithDefaults, ...children);
};
