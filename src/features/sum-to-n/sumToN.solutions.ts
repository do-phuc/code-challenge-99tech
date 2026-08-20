/**
 * Three unique sum-to-n implementations matching the challenge brief.
 * Each returns the sum of integers from 1 to n (inclusive).
 */

/** A — Arithmetic formula: O(1) time, O(1) space. */
export function sumToNFormula(n: number): number {
  return (n * (n + 1)) / 2;
}

/** B — Iterative loop: O(n) time, O(1) space. */
export function sumToNIterative(n: number): number {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

/** C — Recursion: O(n) time, O(n) call-stack space. */
export function sumToNRecursive(n: number): number {
  if (n <= 1) {
    return n;
  }
  return n + sumToNRecursive(n - 1);
}

export type SumToNFn = (n: number) => number;

export type SumToNSolution = {
  id: string;
  title: string;
  description: string;
  code: string;
  run: SumToNFn;
};

export const SUM_TO_N_SOLUTIONS: readonly SumToNSolution[] = [
  {
    id: 'formula',
    title: 'A — Formula',
    description: 'Closed-form arithmetic series in constant time.',
    code: `function(n) {
  return (n * (n + 1)) / 2;
};`,
    run: sumToNFormula,
  },
  {
    id: 'iteration',
    title: 'B — Iteration',
    description: 'Accumulate 1..n with a simple loop.',
    code: `function(n) {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
};`,
    run: sumToNIterative,
  },
  {
    id: 'recursion',
    title: 'C — Recursion',
    description: 'Reduce the problem by summing n with sum(n - 1).',
    code: `const sumToNRecursive = function(n) {
      if (n <= 1) {
          return n;
      }
      return n + sumToNRecursive(n - 1);
    };`,
    run: sumToNRecursive,
  },
] as const;
