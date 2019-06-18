const CommandStore = require('./CommandStore');

class CommandHandler {

  constructor(ws) {
    this.ws = ws;
    this.commandStore = new CommandStore(ws);
  }

  handle(data) {
    const message = this.ws.message.decode(data);
    return this.commandStore.get(message.t).run(message.d);
  }
}

module.exports = CommandHandler;
