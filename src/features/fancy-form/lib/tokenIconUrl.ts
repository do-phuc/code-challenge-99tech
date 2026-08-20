const TOKEN_ICONS_BASE = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

/** Public CDN URL for a Switcheo token icon SVG. */
export function getTokenIconUrl(currency: string): string {
  return `${TOKEN_ICONS_BASE}/${currency}.svg`;
}
