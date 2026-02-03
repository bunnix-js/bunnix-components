/**
 * Mask Utility for Input Fields
 * Supports various input masks including date, time, email, currency, and custom patterns
 */

/**
 * Apply a mask to a value based on the mask type or pattern
 * @param {string} value - The raw input value
 * @param {string|object} mask - The mask type or configuration
 * @returns {string} - The masked value
 */
export function applyMask(value, mask) {
  if (!mask) return value || "";
  
  // Convert value to string and handle empty/undefined/null
  const stringValue = String(value ?? "");
  if (!stringValue) return "";

  // Handle object mask configuration
  if (typeof mask === 'object') {
    const { type, pattern, options } = mask;
    if (type) {
      return applyMaskByType(stringValue, type, options);
    }
    if (pattern) {
      return applyCustomMask(stringValue, pattern);
    }
    return stringValue;
  }

  // Handle string mask type
  return applyMaskByType(stringValue, mask);
}

/**
 * Apply mask based on predefined type
 */
function applyMaskByType(value, type, options = {}) {
  switch (type) {
    case 'date':
      return applyDateMask(value);
    case 'time':
      return applyTimeMask(value);
    case 'email':
      return applyEmailMask(value);
    case 'currency':
      return applyCurrencyMask(value, options);
    case 'decimal':
      return applyDecimalMask(value, options);
    case 'integer':
      return applyIntegerMask(value);
    case 'phone':
      return applyPhoneMask(value, options);
    case 'phone-br':
      return applyPhoneBRMask(value);
    case 'credit-card':
      return applyCreditCardMask(value);
    case 'cpf':
      return applyCPFMask(value);
    case 'cnpj':
      return applyCNPJMask(value);
    case 'cep':
      return applyCEPMask(value);
    default:
      return value;
  }
}

/**
 * Date mask: DD/MM/YYYY
 */
function applyDateMask(value) {
  const digits = value.replace(/\D/g, "");
  let masked = "";
  
  for (let i = 0; i < digits.length && i < 8; i++) {
    if (i === 2 || i === 4) {
      masked += "/";
    }
    masked += digits[i];
  }
  
  return masked;
}

/**
 * Time mask: HH:MM
 */
function applyTimeMask(value) {
  const digits = value.replace(/\D/g, "");
  let masked = "";
  
  for (let i = 0; i < digits.length && i < 4; i++) {
    if (i === 2) {
      masked += ":";
    }
    masked += digits[i];
  }
  
  return masked;
}

/**
 * Email mask: lowercase, no spaces
 */
function applyEmailMask(value) {
  return value.toLowerCase().replace(/\s/g, "");
}

/**
 * Currency mask: $ 1,234.56
 */
function applyCurrencyMask(value, options = {}) {
  const {
    prefix = "$",
    thousandsSeparator = ",",
    decimalSeparator = ".",
    decimalPlaces = 2
  } = options;

  // Ensure value is a string
  const stringValue = String(value ?? "");
  
  // Remove everything except digits
  let digits = stringValue.replace(/[^\d]/g, "");
  
  if (digits === "") return "";
  
  // Convert to number and format
  const number = parseInt(digits, 10);
  const formatted = (number / Math.pow(10, decimalPlaces)).toFixed(decimalPlaces);
  
  // Split integer and decimal parts
  const [integer, decimal] = formatted.split(".");
  
  // Add thousands separator
  const withSeparators = integer.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  
  return `${prefix} ${withSeparators}${decimalSeparator}${decimal}`;
}

/**
 * Decimal mask: 123.45
 */
function applyDecimalMask(value, options = {}) {
  const { decimalPlaces = 2, allowNegative = false } = options;
  
  let cleaned = value.replace(/[^\d.-]/g, "");
  
  if (!allowNegative) {
    cleaned = cleaned.replace(/-/g, "");
  } else {
    // Only allow one minus at the start
    const negative = cleaned.startsWith("-");
    cleaned = cleaned.replace(/-/g, "");
    if (negative) cleaned = "-" + cleaned;
  }
  
  // Only allow one decimal point
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }
  
  // Limit decimal places
  if (parts.length === 2 && parts[1].length > decimalPlaces) {
    cleaned = parts[0] + "." + parts[1].substring(0, decimalPlaces);
  }
  
  return cleaned;
}

/**
 * Integer mask: only digits
 */
function applyIntegerMask(value) {
  return value.replace(/\D/g, "");
}

/**
 * International phone mask: +1 (234) 567-8900 or custom format
 */
function applyPhoneMask(value, options = {}) {
  const { countryCode = "1", format = "us" } = options;
  const digits = value.replace(/\D/g, "");
  
  if (digits.length === 0) return "";
  
  if (format === "br") {
    return applyPhoneBRMask(value);
  }
  
  // Default US/International format
  let masked = "";
  
  // Country code
  if (digits.length >= 1) {
    masked = "+" + digits.substring(0, Math.min(digits.length, countryCode.length));
  }
  
  const ccLength = countryCode.length;
  
  // Area code
  if (digits.length > ccLength) {
    masked += " (" + digits.substring(ccLength, Math.min(digits.length, ccLength + 3));
  }
  
  if (digits.length >= ccLength + 3) {
    masked += ")";
  }
  
  // First part
  if (digits.length > ccLength + 3) {
    masked += " " + digits.substring(ccLength + 3, Math.min(digits.length, ccLength + 6));
  }
  
  // Second part
  if (digits.length > ccLength + 6) {
    masked += "-" + digits.substring(ccLength + 6, Math.min(digits.length, ccLength + 10));
  }
  
  return masked;
}

/**
 * Brazilian phone mask: +55 11 99999-9999 (mobile) or +55 11 9999-9999 (landline)
 */
function applyPhoneBRMask(value) {
  const digits = value.replace(/\D/g, "");
  let masked = "";
  
  if (digits.length === 0) return "";
  
  // Country code: +55
  if (digits.length >= 1) {
    masked = "+" + digits.substring(0, Math.min(digits.length, 2));
  }
  
  // Area code (DDD): 11, 21, etc.
  if (digits.length > 2) {
    masked += " " + digits.substring(2, Math.min(digits.length, 4));
  }
  
  // Phone number
  if (digits.length > 4) {
    const areaCodeEnd = 4;
    const remaining = digits.substring(areaCodeEnd);
    
    // Check if it's a mobile (9 digits) or landline (8 digits)
    // Mobile: 9XXXX-XXXX
    // Landline: XXXX-XXXX
    
    if (remaining.length <= 4) {
      // Still typing the first part
      masked += " " + remaining;
    } else if (remaining.length === 5) {
      // Could be either format, show without dash yet
      masked += " " + remaining;
    } else {
      // Determine format based on length
      // If we have 9+ digits after area code, it's mobile
      const isMobile = remaining.length >= 9 || (remaining.length > 5 && remaining[0] === '9');
      
      if (isMobile) {
        // Mobile: +55 11 99999-9999
        masked += " " + remaining.substring(0, 5);
        if (remaining.length > 5) {
          masked += "-" + remaining.substring(5, 9);
        }
      } else {
        // Landline: +55 11 9999-9999
        masked += " " + remaining.substring(0, 4);
        if (remaining.length > 4) {
          masked += "-" + remaining.substring(4, 8);
        }
      }
    }
  }
  
  return masked;
}

/**
 * Credit card mask: 1234 5678 9012 3456
 */
function applyCreditCardMask(value) {
  const digits = value.replace(/\D/g, "");
  const groups = [];
  
  for (let i = 0; i < digits.length && i < 16; i += 4) {
    groups.push(digits.substring(i, i + 4));
  }
  
  return groups.join(" ");
}

/**
 * Brazilian CPF mask: 123.456.789-01
 */
function applyCPFMask(value) {
  const digits = value.replace(/\D/g, "");
  let masked = "";
  
  for (let i = 0; i < digits.length && i < 11; i++) {
    if (i === 3 || i === 6) {
      masked += ".";
    } else if (i === 9) {
      masked += "-";
    }
    masked += digits[i];
  }
  
  return masked;
}

/**
 * Brazilian CNPJ mask: 12.345.678/0001-90
 */
function applyCNPJMask(value) {
  const digits = value.replace(/\D/g, "");
  let masked = "";
  
  for (let i = 0; i < digits.length && i < 14; i++) {
    if (i === 2 || i === 5) {
      masked += ".";
    } else if (i === 8) {
      masked += "/";
    } else if (i === 12) {
      masked += "-";
    }
    masked += digits[i];
  }
  
  return masked;
}

/**
 * Brazilian CEP mask: 12345-678
 */
function applyCEPMask(value) {
  const digits = value.replace(/\D/g, "");
  let masked = "";
  
  for (let i = 0; i < digits.length && i < 8; i++) {
    if (i === 5) {
      masked += "-";
    }
    masked += digits[i];
  }
  
  return masked;
}

/**
 * Apply custom mask pattern
 * Pattern syntax:
 * - 9: digit
 * - A: letter
 * - *: alphanumeric
 * - Other characters are literals
 * 
 * Example: "999.999.999-99" for CPF
 */
function applyCustomMask(value, pattern) {
  let masked = "";
  let valueIndex = 0;
  
  for (let i = 0; i < pattern.length && valueIndex < value.length; i++) {
    const patternChar = pattern[i];
    const valueChar = value[valueIndex];
    
    if (patternChar === '9') {
      // Digit only
      if (/\d/.test(valueChar)) {
        masked += valueChar;
        valueIndex++;
      } else {
        valueIndex++;
        i--; // Retry with next value character
      }
    } else if (patternChar === 'A') {
      // Letter only
      if (/[a-zA-Z]/.test(valueChar)) {
        masked += valueChar;
        valueIndex++;
      } else {
        valueIndex++;
        i--; // Retry with next value character
      }
    } else if (patternChar === '*') {
      // Alphanumeric
      if (/[a-zA-Z0-9]/.test(valueChar)) {
        masked += valueChar;
        valueIndex++;
      } else {
        valueIndex++;
        i--; // Retry with next value character
      }
    } else {
      // Literal character
      masked += patternChar;
      if (valueChar === patternChar) {
        valueIndex++;
      }
    }
  }
  
  return masked;
}

/**
 * Validate a masked value
 * @param {string} value - The masked value
 * @param {string|object} mask - The mask type or configuration
 * @returns {boolean} - Whether the value is valid
 */
export function validateMask(value, mask) {
  if (!mask || !value) return true;

  const maskType = typeof mask === 'object' ? mask.type : mask;

  switch (maskType) {
    case 'date':
      return validateDate(value);
    case 'time':
      return validateTime(value);
    case 'email':
      return validateEmail(value);
    case 'cpf':
      return validateCPF(value);
    case 'cnpj':
      return validateCNPJ(value);
    default:
      return true; // No validation for other types
  }
}

/**
 * Validate date DD/MM/YYYY
 */
function validateDate(value) {
  if (value.length !== 10) return false;
  const parts = value.split("/");
  if (parts.length !== 3) return false;
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  const date = new Date(year, month, day);
  return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
}

/**
 * Validate time HH:MM
 */
function validateTime(value) {
  if (value.length !== 5) return false;
  const parts = value.split(":");
  if (parts.length !== 2) return false;
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  return !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

/**
 * Validate email
 */
function validateEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Validate Brazilian CPF
 */
function validateCPF(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 11) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(digits)) return false;
  
  // Validate check digits
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i], 10) * (10 - i);
  }
  let checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;
  if (checkDigit !== parseInt(digits[9], 10)) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i], 10) * (11 - i);
  }
  checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;
  if (checkDigit !== parseInt(digits[10], 10)) return false;
  
  return true;
}

/**
 * Validate Brazilian CNPJ
 */
function validateCNPJ(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  
  // Check if all digits are the same
  if (/^(\d)\1+$/.test(digits)) return false;
  
  // Validate first check digit
  let sum = 0;
  let pos = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i], 10) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  let checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (checkDigit !== parseInt(digits[12], 10)) return false;
  
  // Validate second check digit
  sum = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits[i], 10) * pos;
    pos = pos === 2 ? 9 : pos - 1;
  }
  checkDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (checkDigit !== parseInt(digits[13], 10)) return false;
  
  return true;
}

/**
 * Get the maximum length for a mask
 * @param {string|object} mask - The mask type or configuration
 * @returns {number|null} - The maximum length or null if unlimited
 */
export function getMaskMaxLength(mask) {
  if (!mask) return null;

  const maskType = typeof mask === 'object' ? mask.type || mask.pattern : mask;

  const lengths = {
    'date': 10,           // DD/MM/YYYY
    'time': 5,            // HH:MM
    'cpf': 14,            // 123.456.789-01
    'cnpj': 18,           // 12.345.678/0001-90
    'cep': 9,             // 12345-678
    'credit-card': 19,    // 1234 5678 9012 3456
    'phone': 18,          // +1 (234) 567-8900
    'phone-br': 17,       // +55 11 99999-9999
  };

  // Check if it's a predefined mask type first
  if (lengths[maskType]) {
    return lengths[maskType];
  }

  // If not predefined, check if it's a custom pattern
  if (typeof maskType === 'string' && (maskType.includes('.') || maskType.includes('-') || maskType.includes('/') || maskType.includes('9') || maskType.includes('A') || maskType.includes('*'))) {
    // Custom pattern - return pattern length
    return maskType.length;
  }

  return null;
}
