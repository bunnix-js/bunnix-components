export function resolveTextAreaLines(value, fallback = 3) {
  const lines = Number(value);

  if (!Number.isFinite(lines)) return fallback;

  return Math.max(1, Math.floor(lines));
}

export function getTextAreaHeightMetrics({
  lineHeight,
  scrollHeight,
  minLines,
  maxLines,
  verticalInset = 0,
}) {
  const normalizedMinLines = resolveTextAreaLines(minLines, 3);
  const normalizedMaxLines = Math.max(
    normalizedMinLines,
    resolveTextAreaLines(maxLines, 3),
  );
  const minHeight = (lineHeight * normalizedMinLines) + verticalInset;
  const maxHeight = (lineHeight * normalizedMaxLines) + verticalInset;
  const nextHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

  return {
    minHeight,
    maxHeight,
    nextHeight,
    shouldScroll: scrollHeight > maxHeight,
  };
}
