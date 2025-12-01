const Point2D = require('../src/models/point2d');
const Circle = require('../src/models/circle');
const Rectangle = require('../src/models/rectangle');
const Triangle = require('../src/models/triangle');
const Repository = require('../src/repository/repository');
const Warehouse = require('../src/warehouse');


describe('Repository and Warehouse integration', () => {
  let repo, wh;

  beforeEach(() => {
    repo = new Repository();
    wh = Warehouse.getInstance();

    // Очистка Warehouse перед каждым тестом,чтобы новые тесты не зависели от предыдущих.
    wh.areas = new Map();
    wh.perimeters = new Map();
    wh.volumes = new Map();
  });

  test('add, warehouse registers and updates on change', () => {
    // Создание окружности с центром (1,1) и радиусом = 2
    const c = new Circle(1, 'c1', new Point2D(1,1), 2);

    // Добавление в репозиторий
    repo.add(c);

    // Регистрация в Warehouse (Observer)
    wh.registerShape(c);

    // Проверка существования объекта в репозитории
    expect(repo.findById(1)).not.toBeNull();

    // Проверка, что Warehouse корректно посчитал площадь (πR² = 4π)
    expect(Math.abs(wh.getArea(1) - Math.PI * 4)).toBeLessThan(1e-6);

    // Изменение радиус
    c.setRadius(3);

    // Проверка, что новая площадь соответствует π * 9
    expect(Math.abs(wh.getArea(1) - Math.PI * 9)).toBeLessThan(1e-6);

    // Удаление объектв из репозитория
    expect(repo.remove(1)).toBe(true);

    // Разрегистрация из Warehouse
    wh.unregisterShape(c);
  });
});
