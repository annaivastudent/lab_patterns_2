// Прямоугольник — хранит левую нижнюю точку, ширину и высоту.
const Shape = require('./shape');
const Point2D = require('./point2d');

class Rectangle extends Shape {
constructor(id, name, p1, width, height) {
super(id, name);
this.p1 = p1; 
this.width = width;
this.height = height;
this.points = [p1]; // для спецификаций
}


setWidth(w) { this.width = w; this.notifyChange(); }
setHeight(h) { this.height = h; this.notifyChange(); }
setP1(p) { this.p1 = p; this.points = [p]; this.notifyChange(); }


area() { return Math.abs(this.width * this.height); }
perimeter() { return 2 * (Math.abs(this.width) + Math.abs(this.height)); }
volume() { return 0; }
}
module.exports = Rectangle;