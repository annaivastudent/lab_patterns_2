// Хранит площади, периметры и объёмы всех фигур.
// Обновляет значения автоматически при изменении фигуры.
class Warehouse {
constructor() {
this.areas = new Map();
this.perimeters = new Map();
this.volumes = new Map();
}

// Создание Singleton
static getInstance() {
if (!Warehouse.instance) Warehouse.instance = new Warehouse();
return Warehouse.instance;
}

// Регистрация фигуры (сохранение её показателей)
registerShape(s) {
this.areas.set(s.id, s.area());
this.perimeters.set(s.id, s.perimeter());
this.volumes.set(s.id, s.volume());
s.addChangeListener(this);
}


// Удаление фигуры из Warehouse
unregisterShape(s) {
this.areas.delete(s.id);
this.perimeters.delete(s.id);
this.volumes.delete(s.id);
s.removeChangeListener(this);
}


// Метод Observer — вызывается notifyChange()
onShapeChanged(s) {
this.areas.set(s.id, s.area());
this.perimeters.set(s.id, s.perimeter());
this.volumes.set(s.id, s.volume());
}


getArea(id) { return this.areas.get(id); }
getPerimeter(id) { return this.perimeters.get(id); }
getVolume(id) { return this.volumes.get(id); }
}
module.exports = Warehouse;