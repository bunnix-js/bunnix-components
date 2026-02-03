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
