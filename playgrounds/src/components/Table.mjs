import Bunnix, { ForEach, useMemo } from "@bunnix/core";
const { table, thead, tbody, tr, th, td, colgroup, col, span } = Bunnix;

const normalizeKey = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const fallbackKey = (row, index) => {
  if (row && typeof row === "object") {
    const values = Object.values(row).map((val) => normalizeKey(val));
    return `${values.filter(Boolean).join("_")}_${index}`;
  }
  return `${normalizeKey(row)}_${index}`;
};

const resolveColumnWidth = (size) => {
  if (!size || size === "auto") return "auto";
  if (typeof size === "number") return `${size}px`;
  return size;
};

export default function Table({
  columns = [],
  data = [],
  key: keyField,
  renderCell,
  cell,
  searchable,
  variant = "regular",
  interactive = false,
  class: className = ""
} = {}) {
  const renderer = renderCell || cell;
  const searchField = searchable?.field;
  const searchText = searchable?.searchText;
  const searchTextState = searchText && typeof searchText.map === "function" ? searchText : null;

  const variantClass = variant === "background"
    ? "table-bg"
    : variant === "bordered"
      ? "table-bordered"
      : "";
  const interactiveClass = interactive ? "table-hover-rows table-interactive" : "";

  const filterRows = (rows, textValue) => {
    if (!searchField || textValue == null || textValue === "") return rows;
    const needle = String(textValue).toLowerCase();
    return (rows || []).filter((row) => {
      const value = row && typeof row === "object" ? row[searchField] : "";
      return String(value ?? "").toLowerCase().includes(needle);
    });
  };

  const resolvedSearchText = searchTextState ? searchTextState.get() : searchText;
  const isDataState = data && typeof data.get === "function" && typeof data.map === "function";

  const buildRows = (rows, textValue) =>
    filterRows(rows, textValue).map((row, index) => ({
      __key: (keyField && row && row[keyField] != null) ? row[keyField] : fallbackKey(row, index),
      __row: row
    }));

  const normalizedRows = isDataState
    ? useMemo([data, searchTextState], (rows, textValue) =>
        buildRows(rows, textValue)
      )
    : searchTextState
      ? searchTextState.map((textValue) => buildRows(data, textValue))
      : buildRows(data, resolvedSearchText);

  return table({ class: `table ${variantClass} ${interactiveClass} ${className}`.trim() }, [
    colgroup(
      columns.map((column) =>
        col({ style: `width: ${resolveColumnWidth(column.size)};` })
      )
    ),
    thead([
      tr(
        columns.map((column) => th(column.label ?? column.field ?? ""))
      )
    ]),
    tbody([
      ForEach(normalizedRows, "__key", (item, rowIndex) => {
        const row = item.__row;
        return tr(
          columns.map((column, columnIndex) => {
            if (renderer) {
              const rendered = renderer(columnIndex, column.field, row, column);
              if (rendered !== undefined && rendered !== null) {
                return td(rendered);
              }
            }
            const value = row && typeof row === "object" ? row[column.field] : "";
            if (value && typeof value.map === "function") {
              return td(value.map((val) => span(val)));
            }
            return td(String(value ?? ""));
          })
        );
      })
    ])
  ]);
}
