const { Server } = require('ws');
const CommandHandler = require('./core/commands/CommandHandler');
const MessageUtil = require('./utils/MessageUtil');
const ClientStore = require('./core/store/ClientStore');

class Websocket {

  constructor(client) {
    this.client = client;
    this.server = new Server({
      host: process.env.WS_HOST,
      port: process.env.WS_PORT
    });
    this.handler = new CommandHandler(this);
    this.message = new MessageUtil(this);
    this.clients = new ClientStore(this);
    this.server.on('listening', () => this.client.log.info(`[Websocket] Listening on ${this.server.address().address}:${this.server.address().port}`));
  }

  async initialize() {
    this.server.on('connection', socket => {
      socket.authorized = false;

      socket.on('message', data => {
        if (socket.authorized === false) {
          const message = this.message.decode(data);
          if (message.t === 'authorize') {
            if (message.d.secret === process.env.WS_SECRET) {
              this.clients.set(message.d.id, socket);
              socket.authorized = true;
              return this.client.log.info(`[Websocket] [POD ${message.d.id}] Authorized`);
            }
          }
          return socket.close('-1', 'unauthorized');
        }
        this.handler.handle(data);
      });

      socket.on('close', (code, reason) => {
        this.client.log.warn(`[Websocket] The connection was closed with code ${code} ${reason ? reason : ''}`);
        this.clients.forEach(client => {
          if (client.socket === socket) {
            this.clients.delete(client.id);
          }
        });
      });
  
      socket.on('error', error => {
        this.client.log.error(error.message);
      });
    });
  }
}

module.exports = Websocket;
