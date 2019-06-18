const Logger = require('logger');
const API = require('./api/API');
const Websocket = require('./ws/Websocket');
const Controller = require('./controller/Controller');

class Sentinel {

  constructor() {
    this.log = new Logger({});
    this.api = new API(this);
    this.ws = new Websocket(this);
    this.controller = new Controller(this);
  }

  async initialize() {
    await this.api.initialize();
    await this.ws.initialize();
    this.log.info('[Core] Sentinel is ready');
  }
}

module.exports = Sentinel;
