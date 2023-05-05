export function sortDeeply(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortDeeply);
  }

  const sortedObj = {};

  Object.entries(obj).sort(([keyA, valueA], [keyB, valueB]) => {
    const typeA = Array.isArray(valueA) ? 2 : typeof valueA === 'object' ? 1 : 0;
    const typeB = Array.isArray(valueB) ? 2 : typeof valueB === 'object' ? 1 : 0;
    const typeComparison = typeA - typeB;

    if (typeComparison !== 0) {
      return typeComparison;
    } else {
      return keyA.localeCompare(keyB);
    }
  }).forEach(([key, value]) => {
    sortedObj[key] = sortDeeply(value);
  });

  return sortedObj;
}
