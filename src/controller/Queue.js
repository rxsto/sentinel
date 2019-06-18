class Queue extends Array {

  constructor() {
    super();
  }

  add(element) {
    return this.push(element);
  }

  remove() {
    return this.shift();
  }

  get() {
    return this[0];
  }
}

module.exports = Queue;
