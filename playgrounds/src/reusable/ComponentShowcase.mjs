import Bunnix from "@bunnix/core";
import { Heading } from "../../../src/core/typography.mjs";
import { Column, Row } from "../../../src/core/layout.mjs";
import { Code2 } from "../../../src/core/code.mjs";

/**
 * Reusable component showcase template for playground pages.
 *
 * @param {Object} props - Component properties
 * @param {string} props.title - The component title/name
 * @param {string} props.description - Description of the component
 * @param {string} props.code - Code example to display
 * @param {*} props.children - Optional custom content for the left column (overrides title/description)
 * @returns {*} Row template for component showcase
 */
const dedent = (str) => {
  if (!str) return "";

  const lines = str.split('\n');

  // Remove leading and trailing empty lines
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

  if (lines.length === 0) return "";

  // Find minimum indentation
  const minIndent = lines
    .filter(line => line.trim().length > 0)
    .reduce((min, line) => {
      const match = line.match(/^(\s*)/);
      const indent = match ? match[1].length : 0;
      return Math.min(min, indent);
    }, Infinity);

  // Remove the minimum indentation from all lines
  return lines
    .map(line => line.substring(minIndent))
    .join('\n');
};

export const ComponentShowcase = (props, ...children) => {
  const hasCustomContent = children && children.length > 0;
  const trimmedCode = props.code ? dedent(props.code) : "";
  const language = props.language || "js"; // Default to JavaScript

  return Row(
    { border: "primary", radius: "large", overflow: "hidden", alignItems: "start" },
    Column(
      { padding: "large", width: 400, flexShrink: 0, gap: "regular" },
      hasCustomContent
        ? children
        : [
            Heading({ h3: true, color: "secondary" }, props.title),
            props.description,
          ]
    ),
    Code2(
      { 
        bg: "primary-dimmed", 
        flexGrow: 1, 
        padding: "large", 
        alignSelf: "stretch",
        language: language
      },
      trimmedCode,
    ),
  );
};
