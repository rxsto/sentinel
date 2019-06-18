class Shard {

  constructor(client, id, state = 'PENDING') {
    this.client = client;
    this.id = id;
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }
}

module.exports = Shard;
