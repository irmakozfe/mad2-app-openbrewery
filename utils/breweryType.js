// AI-CODED FILE: Colour for each brewery_type value returned by Open Brewery DB 
const TYPE_COLORS = {
  micro: '#f2a93b',
  nano: '#f7c86a',
  regional: '#e07b39',
  brewpub: '#9cc25a',
  large: '#c0582b',
  planning: '#9b8f7e',
  bar: '#c48be0',
  contract: '#5fb3d4',
  proprietor: '#4fc1a6',
  closed: '#e05252',
};

export function typeColor(type) {
  return TYPE_COLORS[type] || '#9b8f7e';
}

export function typeLabel(type) {
  if (!type) return 'Unknown';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function initials(name) {
  if (!name) return '?';
  const words = name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter((w) => w.length > 0 && !['the', 'and', 'of'].includes(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '?';
}