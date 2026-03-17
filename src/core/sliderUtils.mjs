export function toSliderNumber(value, fallback = 0) {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
}

export function isValidSliderSteps(steps) {
  if (!Array.isArray(steps) || steps.length < 2) return false;

  let previousValue = -Infinity;

  for (const step of steps) {
    const nextValue = toSliderNumber(step?.value, NaN);
    if (!Number.isFinite(nextValue) || nextValue <= previousValue) return false;
    previousValue = nextValue;
  }

  return true;
}

export function findNearestSliderStepIndex(steps, value) {
  if (!isValidSliderSteps(steps)) return 0;

  const targetValue = toSliderNumber(value, Number(steps[0].value));
  let nearestIndex = 0;
  let nearestDistance = Math.abs(Number(steps[0].value) - targetValue);

  for (let index = 1; index < steps.length; index += 1) {
    const distance = Math.abs(Number(steps[index].value) - targetValue);
    if (distance < nearestDistance) {
      nearestIndex = index;
      nearestDistance = distance;
    }
  }

  return nearestIndex;
}

export function getSliderStepValue(steps, index) {
  if (!isValidSliderSteps(steps)) return 0;

  const safeIndex = Math.min(
    steps.length - 1,
    Math.max(0, Math.round(toSliderNumber(index, 0))),
  );

  return Number(steps[safeIndex].value);
}

export function hasSliderStepLabels(steps) {
  return Array.isArray(steps) && steps.some((step) => !!step?.label);
}
