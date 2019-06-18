class Pod {

  constructor(client, id, state = 'NOT_REGISTERED') {
    this.client = client;
    this.id = id;
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }
}

module.exports = Pod;
