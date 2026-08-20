import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AmountField } from '@/features/fancy-form/components/AmountField';
import { SubmitButton } from '@/features/fancy-form/components/SubmitButton';
import { SwapDirectionButton } from '@/features/fancy-form/components/SwapDirectionButton';
import { TokenSelect } from '@/features/fancy-form/components/TokenSelect';
import { usePricesQuery } from '@/features/fancy-form/api/usePricesQuery';
import {
  convertAmount,
  formatExchangeRate,
  formatTokenAmount,
} from '@/features/fancy-form/lib/exchangeRate';
import { parsePositiveAmount, sanitizeDecimalInput } from '@/features/fancy-form/lib/validation';
import { useSwapFormStore } from '@/features/fancy-form/store/swapForm.store';

const SUBMIT_DELAY_MS = 1200;

type AmountFormValues = {
  amountIn: string;
};

/** Interactive currency swap form (solution panel content). */
export function SwapForm() {
  const pricesQuery = usePricesQuery();
  const {
    fromCurrency,
    toCurrency,
    amountOut,
    submitStatus,
    submitMessage,
    setFromCurrency,
    setToCurrency,
    swapDirection,
    clearExchangeResult,
    setSubmitting,
    setExchangeSuccess,
    setExchangeError,
  } = useSwapFormStore();

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<AmountFormValues>({
    mode: 'onTouched',
    defaultValues: { amountIn: '' },
  });

  const tokens = useMemo(() => pricesQuery.data ?? [], [pricesQuery.data]);
  const priceByCurrency = useMemo(() => {
    const map = new Map<string, number>();
    for (const token of tokens) map.set(token.currency, token.price);
    return map;
  }, [tokens]);

  const fromPrice = fromCurrency ? priceByCurrency.get(fromCurrency) : undefined;
  const toPrice = toCurrency ? priceByCurrency.get(toCurrency) : undefined;

  const tokenError =
    !fromCurrency || !toCurrency
      ? 'Select both tokens.'
      : fromCurrency === toCurrency
        ? 'Choose two different tokens.'
        : undefined;

  const showAmountError = Boolean(errors.amountIn && touchedFields.amountIn);

  const canSubmit =
    isValid &&
    !tokenError &&
    fromPrice !== undefined &&
    toPrice !== undefined &&
    submitStatus !== 'submitting' &&
    !pricesQuery.isLoading;

  const rateLabel =
    fromCurrency && toCurrency && fromPrice !== undefined && toPrice !== undefined
      ? formatExchangeRate(fromCurrency, toCurrency, fromPrice, toPrice)
      : null;

  async function onExchange({ amountIn }: AmountFormValues) {
    if (tokenError || !fromCurrency || !toCurrency) return;
    if (fromPrice === undefined || toPrice === undefined) return;

    const amountValue = parsePositiveAmount(amountIn);
    if (amountValue === null) return;

    const converted = convertAmount(amountValue, fromPrice, toPrice);
    if (!Number.isFinite(converted)) {
      setExchangeError('Could not compute exchange rate.');
      return;
    }

    setSubmitting();
    await new Promise((resolve) => window.setTimeout(resolve, SUBMIT_DELAY_MS));

    const formattedOut = formatTokenAmount(converted);
    setExchangeSuccess(
      formattedOut,
      `Exchanged ${formatTokenAmount(amountValue)} ${fromCurrency} → ${formattedOut} ${toCurrency}`,
    );
  }

  function handleAmountChange(next: string, onChange: (value: string) => void) {
    onChange(sanitizeDecimalInput(next));
    clearExchangeResult();
  }

  if (pricesQuery.isLoading) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
        <div className="h-24 animate-pulse rounded-xl bg-bg-subtle" />
        <div className="h-10 animate-pulse rounded-full bg-bg-subtle" />
        <div className="h-24 animate-pulse rounded-xl bg-bg-subtle" />
        <p className="lux-caption m-0">Loading token prices…</p>
      </div>
    );
  }

  if (pricesQuery.isError) {
    return (
      <div className="flex flex-col gap-3" role="alert">
        <p className="lux-body m-0 text-sm text-[color:var(--color-danger,#e5484d)]">
          Could not load token prices. Check your connection and try again.
        </p>
        <button
          id="fancy-form-prices-retry"
          type="button"
          className="w-fit cursor-pointer text-sm text-champagne underline-offset-4 !underline"
          onClick={() => void pricesQuery.refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onExchange)} noValidate>
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-border-faint bg-bg/40 p-4 sm:grid-cols-2">
        <TokenSelect
          id="swap-from-token"
          label="From"
          value={fromCurrency}
          options={tokens}
          onChange={setFromCurrency}
        />
        <Controller
          name="amountIn"
          control={control}
          rules={{
            required: 'Enter an amount.',
            validate: (value) =>
              parsePositiveAmount(value) !== null || 'Enter an amount.',
          }}
          render={({ field }) => (
            <AmountField
              id="swap-amount-in"
              label="Amount"
              name={field.name}
              inputRef={field.ref}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(event) => handleAmountChange(event.target.value, field.onChange)}
              error={showAmountError ? errors.amountIn?.message : undefined}
              placeholder="Enter amount"
            />
          )}
        />
      </div>

      <SwapDirectionButton id="swap-direction" onClick={swapDirection} />

      <div className="flex flex-col gap-3 rounded-xl border border-border-faint bg-bg/40 p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <TokenSelect
            id="swap-to-token"
            label="To"
            value={toCurrency}
            options={tokens}
            onChange={setToCurrency}
          />
          <AmountField
            id="swap-amount-out"
            label="You receive"
            value={amountOut ?? ''}
            readOnly
            placeholder="—"
          />
        </div>
        {amountOut !== null && rateLabel ? (
          <p className="lux-caption m-0 text-fg-muted">{rateLabel}</p>
        ) : null}
      </div>

      {tokenError ? (
        <p className="m-0 text-xs text-[color:var(--color-danger,#e5484d)]" role="alert">
          {tokenError}
        </p>
      ) : null}

      <SubmitButton
        id="swap-submit"
        loading={submitStatus === 'submitting'}
        disabled={!canSubmit}
      />

      {submitMessage ? (
        <p
          className="m-0 rounded-lux-lg border border-[rgba(240,199,94,0.28)] bg-[rgba(240,199,94,0.08)] px-3 py-2 text-sm text-champagne"
          role="status"
          aria-live="polite"
        >
          {submitMessage}
        </p>
      ) : null}
    </form>
  );
}
