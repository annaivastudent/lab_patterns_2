// Точка на плоскости. Используется как базовый элемент геометрии
class Point2D {
constructor(x, y) {
this.x = x;
this.y = y;
}


// Расчет расстояния от точки до начала координат
distanceToOrigin() {
return Math.hypot(this.x, this.y);
}
}
module.exports = Point2D;