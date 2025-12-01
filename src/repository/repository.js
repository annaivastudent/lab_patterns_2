// Репозиторий — хранит объекты фигур (добавление, удаление, поиск)
class Repository {
constructor() { this.store = new Map(); }

add(shape) {
this.store.set(shape.id, shape);
}

remove(id) {
const s = this.store.get(id);
    if (s) {
    this.store.delete(id);
    return true;
    }
    return false;
    }

findById(id) 
    { return this.store.get(id) || null; }

getAll() 
    { return [...this.store.values()]; }

// Выполнить поиск по спецификации (Specification Pattern)
query(spec) {
    return [...this.store.values()].filter(s => spec.isSatisfiedBy(s));
}

// Сортировка через переданный comparator
sorted(compareFn) 
    { return [...this.store.values()].sort(compareFn); }
}
module.exports = Repository;