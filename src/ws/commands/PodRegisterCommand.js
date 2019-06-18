const Command = require('../core/commands/Command');
const Pod = require('../../entities/Pod');

class PodRegisterCommand extends Command {

  constructor(ws) {
    super('registerpod');
    this.ws = ws;
  }

  run(id) {
    const pod = new Pod(this.ws.client, id);
    this.ws.client.controller.add(pod);
    this.ws.client.log.info(`[Websocket] [POD ${id}] Registered`);
  }
}

module.exports = PodRegisterCommand;
