const Command = require('../core/commands/Command');
const Message = require('../entities/Message');

class PodLaunchableCommand extends Command {

  constructor(ws) {
    super('podlaunchable');
    this.ws = ws;
  }

  run(id) {
    this.ws.client.controller.pods.get(id).setState('LAUNCHABLE');
    if (this.ws.client.controller.pods.areLaunchable()) {
      const client = this.ws.clients.get(0);
      client.send(this.ws.message.encode(new Message('managerlaunch').get()));
      this.ws.client.log.info('[Websocket] [POD 0] Launched');
    }
  }
}

module.exports = PodLaunchableCommand;
