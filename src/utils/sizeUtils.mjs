/**
 * Standard size vocabulary for Bunnix components
 * Supported values: xsmall | small | regular | large | xlarge
 * Legacy aliases (xs, sm, md, lg, xl, default) are accepted for compatibility.
 */

const sizeAliasMap = {
  xsmall: "xsmall",
  xs: "xsmall",
  small: "small",
  sm: "small",
  regular: "regular",
  md: "regular",
  default: "regular",
  large: "large",
  lg: "large",
  xlarge: "xlarge",
  xl: "xlarge",
};

const sizeTokenMap = {
  xsmall: "xs",
  small: "sm",
  regular: "md",
  large: "lg",
  xlarge: "xl",
};

const sizeOrder = ["xsmall", "small", "regular", "large", "xlarge"];

export function toSizeToken(value) {
  const normalized = normalizeSize(value);
  return sizeTokenMap[normalized];
}

/**
 * Normalizes size values to standard vocabulary
 * @param {string} value - The size value to normalize
 * @returns {string} Normalized size value
 */
export function normalizeSize(value) {
  if (!value) return "regular";

  // Map legacy values to standard ones
  if (sizeAliasMap[value]) return sizeAliasMap[value];

  // Validate against standard vocabulary
  if (sizeOrder.includes(value)) return value;

  // Fallback to medium if invalid
  return "regular";
}

/**
 * Clamps size values to component-specific ranges
 * @param {string} size - The size value to clamp
 * @param {Array<string>} supportedSizes - Array of supported sizes for this component
 * @param {string} defaultSize - Default size if unsupported
 * @returns {string} Clamped size value
 */
export function clampSize(size, supportedSizes = sizeOrder, defaultSize = "regular") {
  const normalized = normalizeSize(size);

  // If component supports this size, return it
  if (supportedSizes.includes(normalized)) return normalized;

  // Prefer explicit default when unsupported (e.g., small -> regular)
  if (supportedSizes.includes(defaultSize)) return defaultSize;

  // Find closest supported size
  const normalizedIndex = sizeOrder.indexOf(normalized);
  const supportedIndices = supportedSizes.map((s) => sizeOrder.indexOf(s));

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
