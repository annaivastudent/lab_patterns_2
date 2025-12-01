const Shape = require('./shape');
const Point2D = require('./point2d');

// Класс "Круг". Имеет центр и радиус
class Circle extends Shape {
constructor(id, name, center, radius) {
super(id, name);
this.center = center;
this.radius = radius;
this.points = [center]; // Первая точка — центр
}

// notifyChange() для Warehouse (изменение параметров)
setRadius(r) { this.radius = r; this.notifyChange(); }
setCenter(c) { this.center = c; this.points = [c]; this.notifyChange(); }


// Площадь круга
area() { return Math.PI * this.radius ** 2; }


// Периметр (длина окружности)
perimeter() { return 2 * Math.PI * this.radius; }


// У круга нет объёма
volume() { return 0; }
}
module.exports = Circle;