const Point2D = require('./models/point2d');
const Circle = require('./models/circle');
const Rectangle = require('./models/rectangle');
const Triangle = require('./models/triangle');
const Repository = require('./repository/repository');
const { QuadrantSpec } = require('./repository/specs');
const Warehouse = require('./warehouse');

//Использование приложения
const repo = new Repository();
const wh = Warehouse.getInstance();

// Создание фигуры Круг
const c = new Circle(1, 'C1', new Point2D(1,1), 2);


// Добавить в репозиторий и в Warehouse
repo.add(c);
wh.registerShape(c);


console.log('Area circle:', wh.getArea(1));


// Изменение Observer - пересчитываем в Warehouse
c.setRadius(3);
console.log('Area circle after radius change:', wh.getArea(1));