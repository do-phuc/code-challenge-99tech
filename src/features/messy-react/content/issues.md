## Bugs (correctness)

1. **`lhsPriority` is undefined** — the filter reads `lhsPriority` but only declares `balancePriority`. This throws at runtime (or always fails the check under loose assumptions). Use `balancePriority`.

2. **Filter logic is inverted** — it keeps rows where `amount <= 0` for known chains, and drops positive balances. The intended rule is almost certainly: keep balances with a known chain (`priority > -99`) **and** `amount > 0`.

3. **`WalletBalance` is missing `blockchain`** — the code reads `balance.blockchain`, but the interface only has `currency` and `amount`. Add a typed `blockchain` field (or a union of allowed chains).

4. **Sort comparator can return `undefined`** — when priorities are equal there is no `return 0`, so `Array.prototype.sort` gets `undefined` (treated as `0` in practice, but it is incorrect and fragile). Always return `-1 | 0 | 1`.

5. **`formatted` is never available on rows** — `formattedBalances` is built and unused; `rows` maps `sortedBalances` while typing each item as `FormattedWalletBalance`, so `balance.formatted` is `undefined` at runtime.

6. **Unsafe USD math** — `prices[balance.currency] * balance.amount` becomes `NaN` when the price is missing. Guard with a fallback (e.g. `prices[currency] ?? 0`) or skip the row.

## TypeScript / API anti-patterns

7. **`blockchain: any`** — defeats type checking. Prefer a `Blockchain` string-union (or `Record` lookup) so invalid chains are caught at compile time.

8. **Empty `Props extends BoxProps`** — adds no fields, yet the component renders a `<div>` and spreads `rest`. Either use the real `Box` component or type props as `ComponentPropsWithoutRef<'div'>`.

9. **`children` is destructured and discarded** — dead API surface. Do not accept props you never render (or render `{children}` intentionally).

10. **`React.FC<Props>`** — adds little here and historically implied `children`. A plain function `function WalletPage(props: Props)` is clearer.

## Computational inefficiencies

11. **`prices` in the `useMemo` dependency array** — sorting/filtering never uses `prices`, so price updates force useless recomputation. Depend only on `balances`.

12. **`getPriority` recreated every render** — a pure lookup defined inside the component. Move it (or a `PRIORITY` map) to module scope so it is stable and cheap.

13. **Priority recomputed repeatedly** — once per filter item, then twice per sort comparison (`O(n log n)` extra calls). Enrich each balance with `priority` once, then filter/sort on that field.

14. **Two passes where one would do** — `formattedBalances` map + separate `rows` map over the unsorted-format source. Build display rows in a single derived list (filter → sort → map to view models).

15. **Index as React `key`** — after reordering by priority, index keys remount rows and can mix up state. Prefer a stable id such as `` `${blockchain}:${currency}` ``.

## Smaller issues

16. **Missing imports / undefined `classes`** — `BoxProps`, hooks, `WalletRow`, and `classes.row` are referenced without definitions in the snippet (incomplete module).

17. **`amount.toFixed()` with no digits** — works, but money UIs usually want an explicit fraction digits policy.
