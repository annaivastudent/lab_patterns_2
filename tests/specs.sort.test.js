const Point2D = require('../src/models/point2d');
const Circle = require('../src/models/circle');
const Rectangle = require('../src/models/rectangle');
const Triangle = require('../src/models/triangle');
const Repository = require('../src/repository/repository');
const { QuadrantSpec, AreaRangeSpec, DistanceRangeSpec } = require('../src/repository/specs');
const Comparators = require('../src/comparators');
const Warehouse = require('../src/warehouse');


describe('specifications and sorting', () => {
  let repo, wh;

  beforeEach(() => {
    // Создание нового репозитория перед каждым тестом
    repo = new Repository();

    // Получаем экземпляр Singleton склада
    wh = Warehouse.getInstance();

    // Очищаем склад, чтобы тесты не мешали друг другу
    wh.areas = new Map();
    wh.perimeters = new Map();
    wh.volumes = new Map();
  });

  test('quadrant, area-range, distance and sorting', () => {
    // три фигуры

    // В 1 квадранте (x>0, y>0)
    const c1 = new Circle(1, 'A', new Point2D(1,1), 1);

    // Во 2 квадранте (x<0, y>0)
    const r = new Rectangle(2, 'B', new Point2D(-1,2), 4, 2);

    // Треугольник тоже находится в 1 квадранте
    const t = new Triangle(
      3,
      'C',
      new Point2D(0.5,0.5),
      new Point2D(1,0),
      new Point2D(0,1)
    );

    repo.add(c1);
    repo.add(r);
    repo.add(t);

    // Регистрирация фигур в Warehouse, чтобы там считались площади, периметры и т.д.
    wh.registerShape(c1);
    wh.registerShape(r);
    wh.registerShape(t);


    // Спецификации по квадранту

    // Поиск объектов, которые находятся в 1 квадранте
    const q1 = repo.query(new QuadrantSpec(1));


    expect(q1.some(s => s.id === 1)).toBeTruthy(); // Circle
    expect(q1.some(s => s.id === 3)).toBeTruthy(); // Triangle


    //Спецификация по диапазону площадей

    // Поиск фигур с площадью от 0 до 5
    const areaSmall = repo.query(new AreaRangeSpec(0, 5));

    // Круг с радиусом 1 имеет площадь примерно 3.14 (попадает)
    expect(areaSmall.length).toBeGreaterThanOrEqual(1);


    //Спецификация по расстоянию до центра координат

    // Поиск фигур, которые расположены близко к центру (0,0)
    const dist = repo.query(new DistanceRangeSpec(0, 1.0));

    // Центроид треугольника расположен недалеко от центра (попадает)
    expect(dist.some(s => s.id === 3)).toBeTruthy();


    // Сортировка по ID

    // Сортировка объектов по id (1,2,3)
    const byId = repo.sorted(Comparators.BY_ID);

    // Первый должен быть объект с id = 1
    expect(byId[0].id).toBe(1);


    // Сортировка по имени

    // Имена: 'A', 'B', 'C'
    const byName = repo.sorted(Comparators.BY_NAME);

    // Алфавитно первой должна быть фигура 'A'
    expect(byName[0].name).toBe('A');
  });
});
