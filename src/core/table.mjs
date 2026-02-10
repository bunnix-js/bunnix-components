/**
 * Table Components (Next-Gen Core)
 *
 * Data table primitives for displaying structured data.
 *
 * Components:
 * - Table: Data table with column headers and row rendering
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
    let theaders = headers.map((h) => td(h.content ?? ""));
    let trows = rows.map((r) =>
      tr(
        headers.map((h) => {
          if (!h.key) return td("");
          if (!(h.key in r)) return td("");
          return td(r[h.key]);
        }),
      ),
    );

    return table(
      {
        ...finalProps,
        class: `table ${finalProps.class || ""}`,
      },
      colgroup(tcols),
      thead(theaders),
      tbody(trows),
    );
  })(props, ...children);
});

// Apply default Table props at export
/**
 * Data table component with column headers and row rendering.
 * 
 * @param {Object} props - Component props
 * @param {Array<{content: *, key: string, size?: number}>} props.headers - Column definitions with content, key for data mapping, and optional size
 * @param {Array<Object>} props.rows - Array of data objects to render as rows (keys should match header keys)
 * @param {boolean} [props.fillWidth=true] - Expand table to fill container width
 * @param {string} [props.class] - Additional CSS classes
 * @param {...*} children - Child elements
 * @returns {*} Table component
 * 
 * @example
 * Table({
 *   headers: [
 *     { content: "Name", key: "name", size: 200 },
 *     { content: "Age", key: "age", size: 100 }
 *   ],
 *   rows: [
 *     { name: "Alice", age: 30 },
 *     { name: "Bob", age: 25 }
 *   ]
 * })
 */
export const Table = (props = {}, ...children) => {
  const propsWithDefaults = { fillWidth: true, ...props };
  return TableCore(propsWithDefaults, ...children);
};
