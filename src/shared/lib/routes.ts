export const ROUTES = {
  home: '/',
  sumToN: '/problems/sum-to-n',
  fancyForm: '/problems/fancy-form',
  messyReact: '/problems/messy-react',
} as const;

export type AppPath = (typeof ROUTES)[keyof typeof ROUTES];

export type ProblemNavItem = {
  id: string;
  to: AppPath;
  number: string;
  title: string;
  description: string;
};

export const PROBLEM_NAV: readonly ProblemNavItem[] = [
  {
    id: 'nav-sum-to-n',
    to: ROUTES.sumToN,
    number: '01',
    title: 'Three ways to sum to n',
    description: 'Three implementations of the sum of 1..n.',
  },
  {
    id: 'nav-fancy-form',
    to: ROUTES.fancyForm,
    number: '02',
    title: 'Fancy Form',
    description: 'An accessible form with validation and a clear UI.',
  },
  {
    id: 'nav-messy-react',
    to: ROUTES.messyReact,
    number: '03',
    title: 'Messy React',
    description: 'A refactor of a messy React tree into a maintainable UI.',
  },
] as const;
