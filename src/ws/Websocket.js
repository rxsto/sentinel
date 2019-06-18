const { Server } = require('ws');
const CommandHandler = require('./core/commands/CommandHandler');
const MessageUtil = require('./utils/MessageUtil');

class Websocket {

  constructor(client) {
    this.client = client;
    this.server = new Server({
      host: process.env.WS_HOST,
      port: process.env.WS_PORT
    });
    this.handler = new CommandHandler(this);
    this.message = new MessageUtil(this);
    this.server.on('listening', () => this.client.log.info(`[Websocket] Listening on ${this.server.address().address}:${this.server.address().port}`));
  }

  async initialize() {
    this.server.on('connection', socket => {
      socket.on('message', message => {
        this.handler.handle(message);
      });

      socket.on('close', (code, reason) => {
        this.client.log.warn(`[Websocket] The connection was closed because of: ${reason} (${code})`);
      });
  
      socket.on('error', error => {
        this.client.log.error(error.message);
      });
    });
  }
}

module.exports = Websocket;
