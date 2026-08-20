export const pricesKeys = {
  all: ['prices'] as const,
  list: () => [...pricesKeys.all, 'list'] as const,
};
