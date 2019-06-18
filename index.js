require('dotenv').config();

const Sentinel = require('./src/Sentinel');

const Client = new Sentinel();

Client.initialize();
