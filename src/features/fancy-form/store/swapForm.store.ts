import { create } from 'zustand';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

type SwapFormState = {
  fromCurrency: string | null;
  toCurrency: string | null;
  /** Formatted receive amount, set only after a successful exchange. */
  amountOut: string | null;
  submitStatus: SubmitStatus;
  submitMessage: string | null;
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  swapDirection: () => void;
  clearExchangeResult: () => void;
  setSubmitting: () => void;
  setExchangeSuccess: (amountOut: string, message: string) => void;
  setExchangeError: (message: string) => void;
};

export const useSwapFormStore = create<SwapFormState>((set) => ({
  fromCurrency: 'ETH',
  toCurrency: 'USDC',
  amountOut: null,
  submitStatus: 'idle',
  submitMessage: null,

  setFromCurrency: (currency) =>
    set((state) => ({
      fromCurrency: currency,
      toCurrency: state.toCurrency === currency ? state.fromCurrency : state.toCurrency,
      amountOut: null,
      submitStatus: 'idle',
      submitMessage: null,
    })),

  setToCurrency: (currency) =>
    set((state) => ({
      toCurrency: currency,
      fromCurrency: state.fromCurrency === currency ? state.toCurrency : state.fromCurrency,
      amountOut: null,
      submitStatus: 'idle',
      submitMessage: null,
    })),

  swapDirection: () =>
    set((state) => ({
      fromCurrency: state.toCurrency,
      toCurrency: state.fromCurrency,
      amountOut: null,
      submitStatus: 'idle',
      submitMessage: null,
    })),

  clearExchangeResult: () =>
    set({
      amountOut: null,
      submitStatus: 'idle',
      submitMessage: null,
    }),

  setSubmitting: () => set({ submitStatus: 'submitting', submitMessage: null }),

  setExchangeSuccess: (amountOut, submitMessage) =>
    set({
      amountOut,
      submitStatus: 'success',
      submitMessage,
    }),

  setExchangeError: (submitMessage) =>
    set({
      amountOut: null,
      submitStatus: 'error',
      submitMessage,
    }),
}));
