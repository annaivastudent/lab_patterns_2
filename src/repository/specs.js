const Warehouse = require('../warehouse');

class Specification {
  isSatisfied(s) {
    throw new Error("isSatisfied() must be implemented in subclass");
  }
  isSatisfiedBy(s) {
    return this.isSatisfied(s);
  }
}

class ByIdSpec extends Specification {
  constructor(id) { super(); this.id = id; }
  isSatisfied(s) { return s.id === this.id; }
}

class ByNameSpec extends Specification {
  constructor(name) { super(); this.name = name.toLowerCase(); }
  isSatisfied(s) { return s.name.toLowerCase() === this.name; }
}

class QuadrantSpec extends Specification {
  constructor(q) { super(); this.q = q; }
  isSatisfied(s) {
    if (!s.points || s.points.length === 0) return false;
    const { x, y } = s.points[0];
    switch (this.q) {
      case 1: return x > 0 && y > 0;
      case 2: return x < 0 && y > 0;
      case 3: return x < 0 && y < 0;
      case 4: return x > 0 && y < 0;
      default: return false;
    }
  }
}

class AreaRangeSpec extends Specification {
  constructor(min, max) { super(); this.min = min; this.max = max; }
  isSatisfied(s) {
    const area = typeof s.area === "function" ? s.area() : 0;
    return area >= this.min && area <= this.max;
  }
}

class DistanceRangeSpec extends Specification {
  constructor(min, max) { super(); this.min = min; this.max = max; }
  isSatisfied(s) {
    if (!s.points || s.points.length === 0) return false;
    const p = s.points[0];
    const d = Math.sqrt(p.x * p.x + p.y * p.y);
    return d >= this.min && d <= this.max;
  }
}

module.exports = {
  ByIdSpec,
  ByNameSpec,
  QuadrantSpec,
  AreaRangeSpec,
  DistanceRangeSpec
};
