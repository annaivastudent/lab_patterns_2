// Базовый класс для всех фигур
// Реализует паттерн Observer — хранит слушателей изменений
class Shape {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.points = [];

    // Храним слушателей
    this._listeners = new Set();

    // Поддержка тестового API
    this._observers = [];
  }

  addChangeListener(l) { 
    this._listeners.add(l); 
  }

  removeChangeListener(l) { 
    this._listeners.delete(l); 
  }

  // Уведомляет слушателей об изменении
  notifyChange() {
    this._listeners.forEach(l => {
      if (typeof l.onShapeChanged === 'function') {
        l.onShapeChanged(this);
      }
    });

    this._observers.forEach(fn => fn());
  }

  addObserver(fn) {
    if (typeof fn === 'function') {
      this._observers.push(fn);
    }
  }

  removeObserver(fn) {
    this._observers = this._observers.filter(f => f !== fn);
  }

  // Методы-заглушки
  area() { return 0; }
  perimeter() { return 0; }
  volume() { return 0; }
}

module.exports = Shape;
