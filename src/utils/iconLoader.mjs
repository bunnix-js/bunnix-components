// Icon SVG loader - dynamically imports and inlines SVG content
const iconCache = new Map();

/**
 * Loads an SVG icon and returns its content
 * @param {string} iconName - The icon name (without .svg extension)
 * @returns {Promise<string>} The SVG content
 */
export async function loadIcon(iconName) {
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName);
  }

  try {
    // Dynamic import of SVG file
    const svgModule = await import(`../icons/${iconName}.svg?raw`);
    const svgContent = svgModule.default;
    
    iconCache.set(iconName, svgContent);
    return svgContent;
  } catch (error) {
    console.warn(`Failed to load icon: ${iconName}`, error);
    return '';
  }
}

/**
 * Synchronously loads icon from pre-bundled map (for production)
 * This will be used when icons are pre-loaded during build
 */
export function getIconSync(iconName) {
  return iconCache.get(iconName) || '';
}

/**
 * Pre-loads all icons into cache (can be called during app initialization)
 */
export async function preloadIcons(iconNames) {
  await Promise.all(iconNames.map(name => loadIcon(name)));
}
