import Bunnix, { ForEach, useMemo, useState } from "@bunnix/core";
import Checkbox from "./Checkbox.mjs";
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

const stableSort = (rows, compare) =>
  rows
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const result = compare(a.item, b.item);
      return result === 0 ? a.index - b.index : result;
    })
    .map((entry) => entry.item);

const compareValues = (aValue, bValue, sortType) => {
  const aEmpty = aValue == null || aValue === "";
  const bEmpty = bValue == null || bValue === "";
  if (aEmpty && bEmpty) return 0;
  if (aEmpty) return 1;
  if (bEmpty) return -1;

  if (sortType === "number") {
    const aNum = Number(aValue);
    const bNum = Number(bValue);
    return aNum - bNum;
  }

  if (sortType === "date") {
    const aDate = new Date(aValue).getTime();
    const bDate = new Date(bValue).getTime();
    return aDate - bDate;
  }

  return String(aValue).localeCompare(String(bValue), undefined, { sensitivity: "base" });
};

export default function Table({
  columns = [],
  data = [],
  key: keyField,
  renderCell,
  cell,
  searchable,
  sortable = [],
  selection,
  sort,
  variant = "regular",
  interactive = false,
  class: className = ""
} = {}) {
  const renderer = renderCell || cell;
  const searchField = searchable?.field;
  const searchText = searchable?.searchText;
  const searchTextState = searchText && typeof searchText.map === "function" ? searchText : null;
  const sortableConfig = Array.isArray(sortable) ? sortable : [];
  const initialSort = sortableConfig.find((entry) => entry.sorted);
  const sortState = useState(
    initialSort
      ? {
          field: initialSort.field,
          direction: initialSort.direction === "desc" ? "desc" : "asc"
        }
      : null
  );
  const selectionEnabled = typeof selection === "function";
  const selectedKeys = useState([]);

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

  const applySort = (rows, sortValue) => {
    if (!sortValue || !sortValue.field) return rows;
    const sortableEntry = sortableConfig.find((entry) => entry.field === sortValue.field);
    if (!sortableEntry) return rows;

    const direction = sortValue.direction === "desc" ? -1 : 1;

    if (sort) {
      const comparator = sort(sortValue.field);
      if (typeof comparator === "function") {
        return stableSort(rows, (a, b) => comparator(a, b) * direction);
      }
    }

    return stableSort(rows, (a, b) => {
      const aValue = a && typeof a === "object" ? a[sortValue.field] : "";
      const bValue = b && typeof b === "object" ? b[sortValue.field] : "";
      return compareValues(aValue, bValue, sortableEntry?.sortType) * direction;
    });
  };

  const buildRows = (rows, textValue, sortValue) =>
    applySort(filterRows(rows, textValue), sortValue).map((row, index) => ({
      __key: (keyField && row && row[keyField] != null) ? row[keyField] : fallbackKey(row, index),
      __row: row
    }));

  const normalizedRows = useMemo(
    [data, searchTextState ?? searchText, sortState],
    (rows, textValue, sortValue) => buildRows(rows, textValue, sortValue)
  );

  const visibleKeysState = normalizedRows && typeof normalizedRows.map === "function"
    ? normalizedRows.map((rows) => (rows || []).map((row) => row.__key))
    : null;

  const isAllSelected = visibleKeysState
    ? useMemo([selectedKeys, visibleKeysState], (keys, visible) =>
        visible.length > 0 && visible.every((key) => keys.includes(key))
      )
    : selectedKeys.map((keys) => keys.length > 0);

  const handleSelectionChange = (next) => {
    selectedKeys.set(next);
    if (selectionEnabled) selection(next);
  };

  const handleToggleAll = () => {
    const visibleKeys = visibleKeysState ? visibleKeysState.get() : [];
    const allSelected = isAllSelected.get();
    handleSelectionChange(allSelected ? [] : visibleKeys);
  };

  const handleToggleRow = (rowKey) => {
    const current = selectedKeys.get();
    const next = current.includes(rowKey)
      ? current.filter((key) => key !== rowKey)
      : [...current, rowKey];
    handleSelectionChange(next);
  };

  const handleSort = (field) => {
    const current = sortState.get();
    if (!current || current.field !== field) {
      sortState.set({ field, direction: "asc" });
      return;
    }
    sortState.set({
      field,
      direction: current.direction === "asc" ? "desc" : "asc"
    });
  };

  return table({ class: `table ${variantClass} ${interactiveClass} ${className}`.trim() }, [
    colgroup(
      [
        selectionEnabled ? col({ style: "width: 40px;" }) : null,
        ...columns.map((column) => col({ style: `width: ${resolveColumnWidth(column.size)};` }))
      ].filter(Boolean)
    ),
    thead([
      tr(
        [
          selectionEnabled ? th({ class: "table-checkbox-cell" }, [
            Checkbox({
              class: "table-checkbox",
              checked: isAllSelected,
              change: handleToggleAll
            })
          ]) : null,
          ...columns.map((column) => {
            const sortableEntry = sortableConfig.find((entry) => entry.field === column.field);
            if (!sortableEntry) {
              return th(column.label ?? column.field ?? "");
            }
            const iconClass = sortState.map((sortValue) => {
              const isSorted = sortValue && sortValue.field === column.field;
              const isAsc = isSorted && sortValue.direction === "asc";
              return `icon icon-chevron-down table-sort-icon ${isSorted ? "icon-base" : "icon-quaternary"} ${isAsc ? "rotate-180" : ""}`.trim();
            });

            return th({
              class: sortState.map((sortValue) => {
                const isSorted = sortValue && sortValue.field === column.field;
                return `table-sortable hoverable ${isSorted ? "is-sorted" : ""}`.trim();
              }),
              click: () => handleSort(column.field)
            }, [
              span({ class: "row-container items-center gap-xs w-full" }, [
                span(column.label ?? column.field ?? ""),
                span({ class: iconClass.map(cls => `${cls} ml-auto`.trim()) })
              ])
            ]);
          })
        ].filter(Boolean)
      )
    ]),
    tbody([
      ForEach(normalizedRows, "__key", (item, rowIndex) => {
        const row = item.__row;
        return tr(
          [
            selectionEnabled ? td({ class: "table-checkbox-cell" }, [
              Checkbox({
                class: "table-checkbox",
                checked: selectedKeys.map((keys) => keys.includes(item.__key)),
                change: () => handleToggleRow(item.__key)
              })
            ]) : null,
            ...columns.map((column, columnIndex) => {
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
          ].filter(Boolean)
        );
      })
    ])
  ]);
}
