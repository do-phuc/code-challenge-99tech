/** Allow digits and at most one decimal point; strip leading zeros before the integer part. */
export function sanitizeDecimalInput(raw: string): string {
  let cleaned = raw.replace(/[^\d.]/g, '');
  const firstDot = cleaned.indexOf('.');
  if (firstDot !== -1) {
    cleaned = cleaned.slice(0, firstDot + 1) + cleaned.slice(firstDot + 1).replace(/\./g, '');
  }

  if (cleaned.startsWith('.')) {
    cleaned = `0${cleaned}`;
  }

  const [whole = '', fraction] = cleaned.split('.');
  const normalizedWhole = whole.replace(/^0+(?=\d)/, '') || (fraction !== undefined ? '0' : '');

  if (fraction !== undefined) {
    return `${normalizedWhole}.${fraction}`;
  }
  return normalizedWhole;
}

export function parsePositiveAmount(raw: string): number | null {
  if (raw === '' || raw === '.') return null;
  const value = Number(raw);
  if (!Number.isFinite(value) || value <= 0) return null;
  return value;
}

export type SwapValidationInput = {
  amountIn: string;
  fromCurrency: string | null;
  toCurrency: string | null;
};

export type SwapValidationResult = {
  ok: boolean;
  amountError?: string;
  tokenError?: string;
};

export function validateSwapForm(input: SwapValidationInput): SwapValidationResult {
  if (!input.fromCurrency || !input.toCurrency) {
    return { ok: false, tokenError: 'Select both tokens.' };
  }
  if (input.fromCurrency === input.toCurrency) {
    return { ok: false, tokenError: 'Choose two different tokens.' };
  }

  const amount = parsePositiveAmount(input.amountIn);
  if (amount === null) {
    return { ok: false, amountError: 'Enter an amount.' };
  }

  return { ok: true };
}
