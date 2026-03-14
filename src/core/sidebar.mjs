/**
 * Sidebar navigation with selectable items and optional nested groups.
 *
 * Features:
 * - State binding for items and selection key
 * - Headers support for grouping items
 * - Recursive nested items with internal expand/collapse state
 * - Parent items stay selectable while toggling their child groups
 */
import { Compute, Show, useEffect, useState } from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";
import { Column, Row, Spacer } from "./layout.mjs";
import { Button } from "./buttons.mjs";
import { Icon } from "./media.mjs";
import { Heading, Text } from "./typography.mjs";

const resolveSelectionValue = (selection) => {
  if (selection?.get) return selection.get();
  return selection ?? "";
};

const buildExpansionState = (items = [], currentState = {}, selectedKey = "") => {
  const nextState = { ...currentState };

  for (const item of items) {
    if (Array.isArray(item.children) && item.children.length > 0) {
      if (!(item.key in nextState)) {
        nextState[item.key] = item.key === selectedKey || (item.expanded ?? false);
      }

      Object.assign(nextState, buildExpansionState(item.children, nextState, selectedKey));
    }
  }

  return nextState;
};

const renderSidebarItem = ({
  item,
  index,
  level,
  selectionWrapper,
  expandedItems,
  setSelection,
  toggleExpanded,
}) => {
  return Show(selectionWrapper, ({ selected }) => {
    if (item.isHeader) {
      return Heading(
        {
          h4: true,
          color: "tertiary",
          textSize: "1rem",
          marginTop: index > 0 ? "regular" : 0,
          ...(level > 0 ? { paddingLeft: level * 20 } : {}),
        },
        item.text,
      );
    }

    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    const isExpanded = !!expandedItems[item.key];
    const isSelected = selected === item.key;

    const button = Button(
      {
        variant: isSelected ? "primary" : "tertiary",
        click: () => {
          setSelection(item.key);
          if (hasChildren) toggleExpanded(item.key);
        },
      },
      Row(
        {
          fillWidth: true,
          alignItems: "center",
          gap: "small",
          ...(level > 0 ? { paddingLeft: level * 20 } : {}),
        },
        ...(level === 0 && item.icon
          ? [
              Icon({
                size: 18,
                name: item.icon,
                ...(isSelected ? {} : { color: "secondary" }),
              }),
            ]
          : []),
        Text({ weight: "heavy" }, item.text),
        Spacer(),
        ...(hasChildren
          ? [
              Icon({
                name: isExpanded ? "chevron-down" : "chevron-right",
                size: 16,
                ...(isSelected ? {} : { color: "secondary" }),
              }),
            ]
          : []),
      ),
    );

    if (!hasChildren) return button;

    return Column(
      { gap: 4 },
      button,
      ...(isExpanded
        ? [
            Column(
              { gap: 4 },
              ...item.children.map((child, childIndex) =>
                renderSidebarItem({
                  item: child,
                  index: childIndex,
                  level: level + 1,
                  selectionWrapper,
                  expandedItems,
                  setSelection,
                  toggleExpanded,
                }),
              ),
            ),
          ]
        : []),
    );
  });
};

const SidebarCore = (props, ...children) => {
  const initialSelection = resolveSelectionValue(props.selection);
  let itemsValue = props.items?.get && props.items?.set
    ? props.items
    : useState(props.items ?? []);
  let selectionValue = props.selection?.get && props.selection?.set
    ? props.selection
    : useState(props.selection ?? "");
  let expandedItemsValue = useState(
    buildExpansionState(itemsValue.get?.() ?? props.items ?? [], {}, initialSelection),
  );
  const selectionWrapper = Compute(selectionValue, (selected) => ({ selected }));

  useEffect((nextItems) => {
    const currentState = expandedItemsValue.get() ?? {};
    const nextState = buildExpansionState(nextItems ?? [], currentState, resolveSelectionValue(selectionValue));

    if (JSON.stringify(currentState) !== JSON.stringify(nextState)) {
      expandedItemsValue.set(nextState);
    }
  }, itemsValue);

  delete props.items;
  delete props.selection;

  const setSelection = (key) => {
    selectionValue.set && selectionValue.set(key);
  };

  const toggleExpanded = (key) => {
    const currentState = expandedItemsValue.get() ?? {};
    expandedItemsValue.set({
      ...currentState,
      [key]: !currentState[key],
    });
  };

  return Show(itemsValue, (resolvedItems) =>
    Show(expandedItemsValue, (expandedItems) =>
      Column(
        { ...props, gap: 4 },
        ...(resolvedItems ?? []).map((item, index) =>
          renderSidebarItem({
            item,
            index,
            level: 0,
            selectionWrapper,
            expandedItems,
            setSelection,
            toggleExpanded,
          }),
        ),
      ),
    ),
  );
};

export const Sidebar = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    SidebarCore(finalProps, ...children),
  )({ padding: "regular", ...props }, ...children),
);
