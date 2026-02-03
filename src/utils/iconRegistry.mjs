// Icon registry - maps icon names to their SVG content
// This file will be auto-generated or manually populated with all icons

export const iconRegistry = {};

/**
 * Registers an icon's SVG content
 * @param {string} name - Icon name
 * @param {string} svgContent - The SVG markup
 */
export function registerIcon(name, svgContent) {
  iconRegistry[name] = svgContent;
}

/**
 * Gets an icon's SVG content
 * @param {string} name - Icon name
 * @returns {string} The SVG markup
 */
export function getIcon(name) {
  return iconRegistry[name] || '';
}

/**
 * Strips the outer <svg> tag and returns inner content
 * We'll keep the full SVG for proper rendering
 */
export function processSvgContent(svgContent) {
  // Ensure viewBox and fill="currentColor" are present
  if (!svgContent.includes('fill=')) {
    svgContent = svgContent.replace('<svg', '<svg fill="currentColor"');
  }
  return svgContent;
}
