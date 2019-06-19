const Store = require('./Store');

class ClientStore extends Store {

  constructor(ws) {
    super();
    this.ws = ws;
  }
}

module.exports = ClientStore;
