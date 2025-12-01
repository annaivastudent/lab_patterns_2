// Сфера — единственная фигура с объёмом.
const Shape = require('./shape');
const Point2D = require('./point2d');

class Sphere extends Shape {
constructor(id, name, center, radius) {
super(id, name);
this.center = center;
this.radius = radius;
this.points = [center];
}

area() { return 4 * Math.PI * this.radius ** 2; }
perimeter() { return 0; }
volume() { return (4/3) * Math.PI * this.radius ** 3; }
}
module.exports = Sphere;