// ISO 3166-1 alpha-2 country codes mapped to real flag images via flagcdn.com
// (public, free-to-use flag CDN) — used instead of flag emoji since Windows/Chrome
// render regional-indicator flag emoji as plain two-letter text, not the flag glyph.
export function flagUrl(code, width = 160) {
  return `https://flagcdn.com/w${width}/${code}.png`;
}
