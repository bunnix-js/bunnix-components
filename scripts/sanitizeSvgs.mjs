import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../src/icons');

// Read all SVG files
const files = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

console.log(`Sanitizing ${files.length} SVG files...`);

let count = 0;

files.forEach(file => {
  const filePath = path.join(iconsDir, file);
  let svgContent = fs.readFileSync(filePath, 'utf-8');
  
  // Remove XML declaration
  svgContent = svgContent.replace(/<\?xml[^>]*\?>\s*/g, '');
  
  // Remove comments
  svgContent = svgContent.replace(/<!--[^>]*-->/g, '');
  
  // Remove hardcoded width/height attributes from <svg> tag only
  svgContent = svgContent.replace(/<svg([^>]*)\swidth="[^"]*"/g, '<svg$1');
  svgContent = svgContent.replace(/<svg([^>]*)\sheight="[^"]*"/g, '<svg$1');
  
  // Replace any hardcoded fill colors (except "none") with currentColor
  svgContent = svgContent.replace(/fill="#[0-9a-fA-F]{3,6}"/g, 'fill="currentColor"');
  svgContent = svgContent.replace(/fill="(?!none|currentColor)[^"]*"/g, 'fill="currentColor"');
  
  // Replace any hardcoded stroke colors (except "none") with currentColor  
  svgContent = svgContent.replace(/stroke="#[0-9a-fA-F]{3,6}"/g, 'stroke="currentColor"');
  svgContent = svgContent.replace(/stroke="(?!none|currentColor)[^"]*"/g, 'stroke="currentColor"');
  
  // Fix broken stroke-width attributes and normalize to 1.5
  svgContent = svgContent.replace(/stroke-width="[^"]*"/g, 'stroke-width="1.5"');
  // Fix broken stroke- attributes (without width value)
  svgContent = svgContent.replace(/\sstroke-\s/g, ' stroke-width="1.5" ');
  
  // Clean up extra whitespace
  svgContent = svgContent.trim();
  
  // Write back
  fs.writeFileSync(filePath, svgContent);
  count++;
});

console.log(`✓ Sanitized ${count} SVG files`);
console.log('All SVGs now use currentColor with stroke-width normalized to 1.5');
