const { QuadrantSpec, AreaRangeSpec, DistanceRangeSpec } = require('../src/repository/specs');
const Circle = require('../src/models/circle');
const Point2D = require('../src/models/point2d');
const Warehouse = require('../src/warehouse');

// Очистка склада перед каждым тестом
beforeEach(() => {
  const wh = Warehouse.getInstance();
  wh.areas = new Map();
  wh.perimeters = new Map();
  wh.volumes = new Map();
});

test('QuadrantSpec correctly filters', () => {
  // Фигура в I квадранте
  const s1 = new Circle(1, "A", new Point2D(1,1), 1);
  
  // Фигура в II квадранте
  const s2 = new Circle(2, "B", new Point2D(-1,1), 1);

  const q1 = new QuadrantSpec(1);
  const q2 = new QuadrantSpec(2);

  expect(q1.isSatisfied(s1)).toBe(true);

  expect(q1.isSatisfied(s2)).toBe(false);


  expect(q2.isSatisfied(s2)).toBe(true);
});

test('AreaRangeSpec works with Warehouse values', () => {
  const wh = Warehouse.getInstance();

  const s = new Circle(1, 'A', new Point2D(0,0), 1);

  // Регистрация фигуры в складе
  wh.registerShape(s);

  const spec = new AreaRangeSpec(3, 4);
  expect(spec.isSatisfied(s)).toBe(true);
});

test('DistanceRangeSpec calculates distance from origin', () => {

  const s = new Circle(1, 'A', new Point2D(3,4), 1);


  const spec = new DistanceRangeSpec(4.9, 5.1);
  expect(spec.isSatisfied(s)).toBe(true);

  const specFail = new DistanceRangeSpec(0, 4);
  expect(specFail.isSatisfied(s)).toBe(false);
});
