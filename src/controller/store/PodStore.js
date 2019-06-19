const Store = require('./Store');

class PodStore extends Store {

  constructor(client) {
    super();
    this.client = client;
  }

  areLaunchable() {
    let state = true;
    this.forEach(pod => {
      if (pod.state !== 'LAUNCHABLE') {
        state = false;
      }
    });
    return state;
  }

  getNextLaunchable(id) {
    let next = null;
    const pre = this.get(id);
    if (pre.state !== 'LAUNCHABLE') {
      this.forEach(pod => {
        if (pod.state === 'LAUNCHABLE') {
          next = pod;
        }
      });
    } else {
      next = pre;
    }
    return next;
  }
}

module.exports = PodStore;
