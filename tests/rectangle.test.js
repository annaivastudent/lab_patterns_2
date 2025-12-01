const Rectangle = require('../src/models/rectangle');
const Point2D = require('../src/models/point2d');

test('Rectangle setters call notify and update fields', () => {
  // Создание прямоугольника с начальными параметрами
  const r = new Rectangle(1, 'R', new Point2D(0,0), 2, 3);

  // Подсчет количества срабатываний notifyChange()
  let updates = 0;
  r.addObserver(() => updates++);

  r.setWidth(10);
  expect(r.width).toBe(10);

  r.setHeight(20);
  expect(r.height).toBe(20);

  r.setP1(new Point2D(5,5));
  expect(r.p1.x).toBe(5);
  expect(r.p1.y).toBe(5);

  expect(updates).toBe(3);
});
