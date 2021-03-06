const Command = require('../core/commands/Command');
const Message = require('../entities/Message');

class PodReadyCommand extends Command {

  constructor(ws) {
    super('podready');
    this.ws = ws;
  }

  run(id) {
    this.ws.client.log.info(`[Websocket] [POD ${id}] Ready`);
    this.ws.client.controller.pods.get(id).setState('READY');
    const next = this.ws.client.controller.pods.getNextLaunchable();
    if (next !== null) {
      this.ws.server.clients.forEach(client => {
        if (!client.launched) {
          client.send(this.ws.message.encode(new Message('managerlaunch').get()));
          this.ws.client.log.info(`[Websocket] [POD ${next.id}] Launched`);
          client.launched = true;
        }
      });
    }
  }
}

module.exports = PodReadyCommand;
