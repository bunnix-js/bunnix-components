export const resolveIconClass = (value) => {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw) return "";
  const parts = raw.split(/\s+/);
  const hasIconClass = parts.some((part) => part.startsWith("icon-"));
  if (hasIconClass) return raw;
  parts[0] = `icon-${parts[0]}`;
  return parts.join(" ");
};

const ignoredIconParts = new Set([
  "icon",
  "icon-xs",
  "icon-sm",
  "icon-md",
  "icon-lg",
  "icon-xl",
  "icon-default",
  "icon-base",
  "icon-primary",
  "icon-primary-dimmed",
  "icon-white",
  "icon-secondary",
  "icon-tertiary",
  "icon-quaternary",
  "icon-accent",
  "icon-accent-dimmed",
  "icon-destructive",
  "icon-destructive-dimmed",
]);

export const resolveIconName = (value) => {
  if (typeof value !== "string") return "";
  const raw = value.trim();
  if (!raw) return "";
  const parts = raw.split(/\s+/);

  for (const part of parts) {
    if (!part.startsWith("icon-")) continue;
    if (ignoredIconParts.has(part)) continue;
    return part.slice(5);
  }

  return parts[0] || "";
};
