const Shape = require('./shape');
const Point2D = require('./point2d');

// Треугольник по трём точкам.
class Triangle extends Shape {
constructor(id, name, a, b, c) {
super(id, name);
this.a = a; this.b = b; this.c = c;
this.points = [a, b, c];
}

// Длина стороны
_side(p1, p2) { return Math.hypot(p1.x - p2.x, p1.y - p2.y); }

// Площадь по формуле Герона
area() {
const ab = this._side(this.a, this.b);
const bc = this._side(this.b, this.c);
const ca = this._side(this.c, this.a);
const s = (ab + bc + ca) / 2; // полупериметр
const v = s * (s - ab) * (s - bc) * (s - ca);
return v <= 0 ? 0 : Math.sqrt(v);
}

perimeter() {
return this._side(this.a, this.b) + this._side(this.b, this.c) + this._side(this.c, this.a);
}


volume() { return 0; }
}
module.exports = Triangle;