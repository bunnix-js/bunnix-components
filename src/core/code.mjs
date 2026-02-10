/**
 * Code Components (Next-Gen Core)
 *
 * Code display primitives for showing formatted code blocks.
 *
 * Components:
 * - Code2: Pre-formatted code block with automatic wrapping and style extraction
 *
 * Features:
 * - Automatic style extraction (width, height, padding, etc.)
 * - Flexible props normalization (supports both props object and direct children)
 * - Pre-wrap whitespace handling (preserves newlines, wraps long lines)
 * - Word breaking for overflow prevention
 * - Optional syntax highlighting for JavaScript code
 */
import Bunnix from "@bunnix/core";
import { withNormalizedArgs, withExtractedStyles } from "./utils.mjs";

const { pre } = Bunnix;

/**
 * Simple JavaScript syntax highlighter using regex patterns.
 * Tokenizes code into segments and wraps each in appropriate span elements.
 * 
 * @param {string} code - The code string to highlight
 * @returns {string} HTML string with syntax highlighting spans
 */
function highlightJS(code) {
  if (!code) return "";
  
  // Escape HTML to prevent XSS
  const escapeHTML = (str) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  code = escapeHTML(code);
  
  // Define token patterns in order of precedence
  const tokens = [
    // Comments
    { pattern: /(\/\/.*$)/gm, className: 'comment' },
    { pattern: /(\/\*[\s\S]*?\*\/)/g, className: 'comment' },
    // Strings
    { pattern: /("(?:[^"\\]|\\.)*")/g, className: 'string' },
    { pattern: /('(?:[^'\\]|\\.)*')/g, className: 'string' },
    { pattern: /(`(?:[^`\\]|\\.)*`)/g, className: 'string' },
    // Keywords
    { pattern: /\b(import|export|from|const|let|var|function|return|if|else|for|while|do|break|continue|switch|case|default|try|catch|finally|throw|async|await|class|extends|new|this|super|static|get|set|typeof|instanceof|delete|void|yield)\b/g, className: 'keyword' },
    // Booleans and special values
    { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'boolean' },
    // Numbers
    { pattern: /\b(\d+\.?\d*)\b/g, className: 'number' },
    // Function names (word followed by opening parenthesis)
    { pattern: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, className: 'function' },
  ];
  
  // Track which parts of the string have been processed
  const segments = [];
  let lastIndex = 0;
  
  // Find all matches for all patterns
  const allMatches = [];
  tokens.forEach(({ pattern, className }) => {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(code)) !== null) {
      allMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        text: match[0],
        className: className
      });
    }
  });
  
  // Sort matches by start position
  allMatches.sort((a, b) => a.start - b.start);
  
  // Process matches, skipping overlaps
  allMatches.forEach(match => {
    if (match.start >= lastIndex) {
      // Add any plain text before this match
      if (match.start > lastIndex) {
        segments.push(code.substring(lastIndex, match.start));
      }
      // Add the highlighted match
      segments.push(`<span class="${match.className}">${match.text}</span>`);
      lastIndex = match.end;
    }
  });
  
  // Add any remaining plain text
  if (lastIndex < code.length) {
    segments.push(code.substring(lastIndex));
  }
  
  return segments.join('');
}

const Code2Core = (props, ...children) => {
  const language = props.language;
  delete props.language;
  
  // If language is specified and content is string, apply highlighting
  if (language === 'js' || language === 'javascript') {
    const codeString = typeof children[0] === 'string' ? children[0] : '';
    if (codeString) {
      return pre({
        ...props,
        class: `code ${props.class || ""}`,
        innerHTML: highlightJS(codeString),
      });
    }
  }
  
  return pre({
    ...props,
    class: `code ${props.class || ""}`,
  }, ...children);
};

export const Code2 = withNormalizedArgs((props, ...children) =>
  withExtractedStyles((finalProps, ...children) =>
    Code2Core(finalProps, ...children),
  )(props, ...children),
);
