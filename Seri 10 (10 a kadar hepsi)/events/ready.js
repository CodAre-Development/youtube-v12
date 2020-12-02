const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')

module.exports = client => {

console.log("Bot Hazır");

var randomMesajlar = [

    "Emrinizdeyim",
    "ByMayFe'ın Köpeğiyim"
]




setInterval(function() {
    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]
    client.user.setActivity(`${randomMesajlar1}`);

}, 2 * 30000);

client.user.setStatus("idle");





}