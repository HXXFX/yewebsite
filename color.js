
export const ACCENTS = {
  cyan:  { hex: '#14EAFF', name: 'Reference cyan' },
  red:   { hex: '#FF3B30', name: 'Red dot' },
  brass: { hex: '#D4A84B', name: 'Brass' },
  lime:  { hex: '#C8F031', name: 'Hi-vis lime' },
};

export function parseColor(s) {
  s = String(s).trim();
  if (s[0] === '#') {
    const n = s.slice(1);
    return [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16)).concat(1);
  }
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return [0, 0, 0, 0];
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
  return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
}

export function lumRGB(r, g, b) {
  const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
export const lum = c => { const [r, g, b] = parseColor(c); return lumRGB(r, g, b); };
export const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
export const contrast = (a, b) => ratio(lum(a), lum(b));
export const onAccent = hex => (contrast(hex, '#000000') >= contrast(hex, '#FFFFFF') ? '#0A0A0A' : '#FFFFFF');

export function lab(c) {
  const [r, g, b] = parseColor(c).slice(0, 3).map(v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
  const X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047, Y = 0.2126 * r + 0.7152 * g + 0.0722 * b, Z = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883;
  const f = t => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
}
export const deltaE = (a, b) => { const p = lab(a), q = lab(b); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); };
