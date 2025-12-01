const Comparators = require('../src/comparators');
const Circle = require('../src/models/circle');
const Point2D = require('../src/models/point2d');

test('Comparators sort by id and name', () => {
  // Создание двух фигур
  const a = new Circle(2, "B", new Point2D(0,0), 1);
  const b = new Circle(1, "A", new Point2D(0,0), 1);

  expect(Comparators.BY_ID(a, b)).toBeGreaterThan(0);

  expect(Comparators.BY_NAME(a, b)).toBeGreaterThan(0);
});
