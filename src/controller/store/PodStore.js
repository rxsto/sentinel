const Store = require('./Store');

class PodStore extends Store {

  constructor(client) {
    super();
    this.client = client;
  }

  isLaunchable() {
    let state = true;
    this.forEach(pod => {
      if (pod.state !== 'LAUNCHABLE') {
        state = false;
      }
    });
    return state;
  }

  getNextLaunchable() {
    let next = null;
    this.forEach(pod => {
      if (pod.state === 'LAUNCHABLE') {
        next = pod;
      }
    });
    return next;
  }
}

module.exports = PodStore;
