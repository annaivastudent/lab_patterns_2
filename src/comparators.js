// Набор Comparator-функций для сортировки.
const Comparators = {
BY_ID: (a,b) => a.id - b.id,
BY_NAME: (a,b) => a.name.localeCompare(b.name),
BY_FIRST_POINT_X: (a,b) => (a.points[0]?.x ?? 0) - (b.points[0]?.x ?? 0),
BY_FIRST_POINT_Y: (a,b) => (a.points[0]?.y ?? 0) - (b.points[0]?.y ?? 0)
};
module.exports = Comparators;