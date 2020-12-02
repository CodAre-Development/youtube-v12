const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')

module.exports = message => {
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(' ')[0].slice(prefix.length);
    let params = message.content.split(' ').slice(1);
    let perms = client.elevation(message);
    let cmd;
    if (client.commands.has(command)) {
      cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
      if (perms < cmd.conf.permLevel) return;
      cmd.run(client, message, params, perms);
    }

}