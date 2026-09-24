/**
 * Currency Input Utilities
 *
 * Pure, SSR-safe helpers for localized currency formatting and parsing.
 * No Bunnix dependency. Unit-testable with Intl.NumberFormat.
 */

export function resolveLocale(locale) {
  if (typeof locale === "string" && locale.trim() !== "") {
    try {
      Intl.NumberFormat(locale);
      return locale;
    } catch {
      // fall through to navigator / Intl default
    }
  }

  try {
    const navigatorLanguage = globalThis.navigator?.language;
    if (typeof navigatorLanguage === "string" && navigatorLanguage.trim() !== "") {
      Intl.NumberFormat(navigatorLanguage);
      return navigatorLanguage;
    }
  } catch {
    // fall through to Intl default
  }

  try {
    return Intl.NumberFormat().resolvedOptions().locale;
  } catch {
    return "en-US";
  }
}

export function resolveCurrency(currency, locale) {
  if (typeof currency === "string" && currency.trim() !== "") {
    return currency.trim().toUpperCase();
  }

  const resolvedLocale = resolveLocale(locale);
  try {
    const resolved = Intl.NumberFormat(resolvedLocale, {
      style: "currency",
      currency: "USD",
    }).resolvedOptions().currency;
    if (typeof resolved === "string" && resolved.trim() !== "") return resolved;
  } catch {
    // fall through to USD fallback
  }

  return "USD";
}

export function getFractionDigits(currency, locale, override) {
  if (typeof override === "number" && Number.isFinite(override) && override >= 0) {
    return Math.floor(override);
  }

  const resolvedLocale = resolveLocale(locale);
  const resolvedCurrency = resolveCurrency(currency, resolvedLocale);
  try {
    const resolved = Intl.NumberFormat(resolvedLocale, {
      style: "currency",
      currency: resolvedCurrency,
    }).resolvedOptions();
    if (typeof resolved.maximumFractionDigits === "number") {
      return resolved.maximumFractionDigits;
    }
  } catch {
    // fall through to default
  }

  return 2;
}

function getSeparators(locale) {
  const resolvedLocale = resolveLocale(locale);
  try {
    const parts = Intl.NumberFormat(resolvedLocale).formatToParts(12345.6);
    let group = "";
    let decimal = "";
    for (const part of parts) {
      if (part.type === "group") group = part.value;
      if (part.type === "decimal") decimal = part.value;
    }
    return { group, decimal };
  } catch {
    return { group: ",", decimal: "." };
  }
}

export function formatCurrency(value, options = {}) {
  if (value === null || value === undefined || value === "") return "";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";

  const resolvedLocale = resolveLocale(options.locale);
  const resolvedCurrency = resolveCurrency(options.currency, resolvedLocale);
  try {
    return new Intl.NumberFormat(resolvedLocale, {
      style: "currency",
      currency: resolvedCurrency,
    }).format(numeric);
  } catch {
    return String(value ?? "");
  }
}

export function toEditableString(value, options = {}) {
  if (value === null || value === undefined || value === "") return "";
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";

  const resolvedLocale = resolveLocale(options.locale);
  const resolvedCurrency = resolveCurrency(options.currency, resolvedLocale);
  const digits = getFractionDigits(resolvedCurrency, resolvedLocale, options.fractionDigits);
  const { group } = getSeparators(resolvedLocale);

  try {
    const formatted = new Intl.NumberFormat(resolvedLocale, {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    }).format(numeric);

    if (!group) return formatted;
    return formatted.split(group).join("");
  } catch {
    return String(value ?? "");
  }
}

function normalizeSeparators(text, locale) {
  const { group, decimal } = getSeparators(locale);
  const hasDot = text.includes(".");
  const hasComma = text.includes(",");

  if (hasDot && hasComma) {
    const lastDot = text.lastIndexOf(".");
    const lastComma = text.lastIndexOf(",");
    const decimalCandidate = lastDot > lastComma ? "." : ",";
    const groupCandidate = decimalCandidate === "." ? "," : ".";
    return { decimalCandidate, groupCandidate };
  }

  if (hasDot || hasComma) {
    const present = hasDot ? "." : ",";
    if (present === decimal) return { decimalCandidate: decimal, groupCandidate: group };
    if (present === group) {
      const other = present === "." ? "," : ".";
      return { decimalCandidate: other, groupCandidate: present };
    }
    return { decimalCandidate: present, groupCandidate: group === present ? "" : group };
  }

  return { decimalCandidate: decimal, groupCandidate: group };
}

export function parseCurrency(text, options = {}) {
  if (text === null || text === undefined) return { value: null, valid: false };
  const raw = String(text);
  if (raw.trim() === "") return { value: null, valid: true };

  const resolvedLocale = resolveLocale(options.locale);
  const cleaned = raw.replace(/[\s\u00A0\u202F]/g, "");
  if (cleaned === "" || cleaned === "-" || cleaned === "+") {
    return { value: null, valid: false };
  }

  const { decimalCandidate, groupCandidate } = normalizeSeparators(cleaned, resolvedLocale);

  let filtered = "";
  for (const char of cleaned) {
    if (char >= "0" && char <= "9") {
      filtered += char;
      continue;
    }
    if (char === "-") {
      filtered += char;
      continue;
    }
    if (decimalCandidate && char === decimalCandidate) {
      filtered += char;
      continue;
    }
    if (groupCandidate && char === groupCandidate) {
      filtered += char;
      continue;
    }
    if ((char === "." || char === ",") && (char === decimalCandidate || char === groupCandidate)) {
      filtered += char;
      continue;
    }
  }

  if (filtered === "" || filtered === "-" || filtered === "+") {
    return { value: null, valid: false };
  }

  const decimalOccurrences = decimalCandidate
    ? filtered.split(decimalCandidate).length - 1
    : 0;
  if (decimalOccurrences > 1) return { value: null, valid: false };

  let withoutGroups = filtered;
  if (groupCandidate) {
    withoutGroups = withoutGroups.split(groupCandidate).join("");
  }

  let canonical = withoutGroups;
  if (decimalCandidate && decimalCandidate !== ".") {
    canonical = canonical.split(decimalCandidate).join(".");
  }

  if (canonical === "" || canonical === "-" || canonical === "." || canonical === "-.") {
    return { value: null, valid: false };
  }

  const parsed = Number(canonical);
  if (!Number.isFinite(parsed)) return { value: null, valid: false };

  return { value: parsed, valid: true };
}

export function isIncompleteDecimal(text, options = {}) {
  if (text === null || text === undefined) return false;
  const raw = String(text);
  if (raw === "") return false;

  const resolvedLocale = typeof options === "string" ? options : options.locale;
  const { decimal } = getSeparators(resolvedLocale);
  const candidates = new Set([".", ",", decimal].filter(Boolean));

  const trimmedEnd = raw.replace(/[\s\u00A0\u202F]+$/g, "");
  const lastChar = trimmedEnd.slice(-1);
  if (candidates.has(lastChar)) return true;

  const trailingZeroMatch = trimmedEnd.match(/[.,](\d*0)$/);
  if (trailingZeroMatch) {
    const fraction = trailingZeroMatch[1];
    if (fraction.length > 0 && /^0+$/.test(fraction)) return true;
  }

  return false;
}
