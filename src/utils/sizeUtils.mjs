/**
 * Standard size vocabulary for Bunnix components
 * Supported values: xs | sm | md | lg | xl
 */

/**
 * Normalizes size values to standard vocabulary
 * @param {string} value - The size value to normalize
 * @returns {string} Normalized size value
 */
export function normalizeSize(value) {
  if (!value) return "md";

  // Map legacy values to standard ones
  if (value === "default" || value === "regular") return "md";

  // Validate against standard vocabulary
  const validSizes = ["xs", "sm", "md", "lg", "xl"];
  if (validSizes.includes(value)) return value;

  // Fallback to medium if invalid
  return "md";
}

/**
 * Clamps size values to component-specific ranges
 * @param {string} size - The size value to clamp
 * @param {Array<string>} supportedSizes - Array of supported sizes for this component
 * @param {string} defaultSize - Default size if unsupported
 * @returns {string} Clamped size value
 */
export function clampSize(size, supportedSizes = ["xs", "sm", "md", "lg", "xl"], defaultSize = "md") {
  const normalized = normalizeSize(size);

  // If component supports this size, return it
  if (supportedSizes.includes(normalized)) return normalized;

  // Find closest supported size
  const sizeOrder = ["xs", "sm", "md", "lg", "xl"];
  const normalizedIndex = sizeOrder.indexOf(normalized);
  const supportedIndices = supportedSizes.map(s => sizeOrder.indexOf(s));

  // Find the closest supported size
  let closestSize = defaultSize;
  let minDistance = Infinity;

  for (const supportedIndex of supportedIndices) {
    const distance = Math.abs(supportedIndex - normalizedIndex);
    if (distance < minDistance) {
      minDistance = distance;
      closestSize = sizeOrder[supportedIndex];
    }
  }

  return closestSize;
}