const Queue = require('./Queue');
const PodStore = require('./store/PodStore');
const Message = require('../ws/entities/Message');

const request = require('superagent');

class Controller extends Map {

  constructor(client) {
    super();
    this.client = client;
    this.queue = new Queue();
    this.pods = new PodStore(this);
  }

  async initialize() {
    try {
      const result = await request.get('https://discordapp.com/api/v6/gateway/bot').set('Authorization', `Bot ${process.env.DISCORD_TOKEN}`);
      let total = result.body.shards;
      if (total < process.env.TOTAL_PODS) {
        total = Number(process.env.TOTAL_PODS);
      }
      let shards = [];
      for (let i = 0; i < process.env.TOTAL_PODS; i++) {
        shards.push(i);
      }
      let pods = new Array(process.env.TOTAL_PODS);
      for (let i = 0; i < process.env.TOTAL_PODS; i++) {
        pods[i] = [];
      }
      let podIndex = (index) => index % process.env.TOTAL_PODS;
      for (let i = 0; i < shards.length; i++) {
        pods[podIndex(i)].push(shards[i]);
      }
      let i = 0;
      this.client.ws.server.clients.forEach(client => {
        client.send(this.client.ws.message.encode(new Message('managerinitialize', { shards: pods[i], total: total }).get()));
        i++;
      });
    } catch (error) {
      this.client.log.error(error.message);
    }
  }

  add(pod) {
    this.pods.set(pod.id, pod);
    this.pods.get(pod.id).setState('REGISTERED');
    if (this.pods.size.toString() === process.env.TOTAL_PODS) {
      this.initialize();
    }
  }
}

module.exports = Controller;
