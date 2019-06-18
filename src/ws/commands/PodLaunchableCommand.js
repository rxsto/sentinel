const Command = require('../core/commands/Command');
const Message = require('../entities/Message');

class PodLaunchableCommand extends Command {

  constructor(ws) {
    super('podlaunchable');
    this.ws = ws;
  }

  run(id) {
    this.ws.client.controller.pods.get(id).setState('LAUNCHABLE');
    if (this.ws.client.controller.pods.isLaunchable()) {
      let initial = false;
      this.ws.server.clients.forEach(client => {
        if (initial === false) {
          client.send(this.ws.message.encode(new Message('managerlaunch').get()));
          this.ws.client.log.info('[Websocket] [POD 0] Launched');
          client.launched = true;
          initial = true;
        }
      });
    }
  }
}

module.exports = PodLaunchableCommand;
