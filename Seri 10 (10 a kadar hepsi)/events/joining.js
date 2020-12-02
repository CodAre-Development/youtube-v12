const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')
const qdb = require('quick.db');
let tarih = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});

module.exports = member => {

    var channel = qdb.fetch(`giriskanali_${member.guild.id}`)
    var channelcık = member.guild.channels.cache.get(channel);

    if (!channelcık) return;


var randomMesajlar = [
    "Geldin Bizi Sevindirdin ",
    "Hoş Geldin Reis "
]


    var randomMesajlar1 = randomMesajlar[Math.floor(Math.random() * (randomMesajlar.length))]



    var embedv1 = new Discord.MessageEmbed()
    .setColor("#BA75E5")
    .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    .setDescription(randomMesajlar1 + member.user.username)
    .addField("Katılan Kişinin Detayları", `Katılan Kişi: **${member}**\nSunucuya Giriş Tarihi: **${tarih}**`)

    return channelcık.send(embedv1);


}