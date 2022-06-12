const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../config.json');
const client = new Client();
const mongoose = require("./database/mongoose");

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = config.DEFAULT_PREFIX;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await mongoose.init();

  await client.login(config.token);
})();