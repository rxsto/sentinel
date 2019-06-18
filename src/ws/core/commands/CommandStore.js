const fs = require('fs');
const path = require('path');

class CommandStore extends Map {
  
  constructor(ws) {
    super();
    this.ws = ws;
    this.storeCommands(path.join(process.cwd(), './src/ws/commands/'));
  }

  storeCommands(directory) {
    fs.readdirSync(directory).forEach(file => {
      const command = require(directory + file);
      const instance = new command(this.ws);
      this.set(instance.name, instance);
    });
  }
}

module.exports = CommandStore;
