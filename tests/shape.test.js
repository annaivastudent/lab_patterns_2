const Shape = require('../src/models/shape');

// Создаём простой тестовый класс-фигуру, чтобы проверить работу Observer
class Dummy extends Shape {
  constructor(id, name) {
    super(id, name);
  }
  area() { return 0; }
  perimeter() { return 0; }
  volume() { return 0; }
}

test('Shape observer mechanics', () => {
  // Создаём объект фигуры
  const s = new Dummy(10, "X");

  let callCount = 0;

  // Observer — просто функция, увеличивающая счётчик
  const observer = () => callCount++;

  // Добавляем observer в Shape
  s.addObserver(observer);

  // notifyChange() должен вызвать observer и увеличить счётчик
  s.notifyChange();
  expect(callCount).toBe(1);


  s.removeObserver(observer);

  // notifyChange() больше не должен вызывать observer
  s.notifyChange();
  expect(callCount).toBe(1); 
});
