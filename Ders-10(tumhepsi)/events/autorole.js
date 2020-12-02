const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')
const qdb = require('quick.db');
let tarih = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});

module.exports = member => {

    var role = qdb.fetch(`otorol_${member.guild.id}`);
    var channel = qdb.fetch(`otorolkanali_${member.guild.id}`);
    var text = qdb.fetch(`otorolyazi_${member.guild.id}`);

    var rolcık = member.guild.roles.cache.get(role);
    var kanalcık = member.guild.channels.cache.get(channel);
   if(text) var textcik = text.replace("{guild}", `**${member.guild}**`).replace("{user}", `**${member.user.username}**`)
    var textcikcik = text ? textcik : `${member.guild} Sunucusuna Hoş Geldin {user}`;
    if(!rolcık) return;
    

    member.roles.add(rolcık.id);
    
    if(!kanalcık) return;

    var embedv1 = new Discord.MessageEmbed()
    .setColor("#BA75E5")
    .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    .setTitle("Rol Başarıyla Verildi")
    .setDescription(textcikcik)
    .addField("Log Detayları", `Katılan Kişi: **${member}**\nSunucuya Giriş Tarihi: **${tarih}**\nVerilen Rol: **${rolcık}**`)

    return kanalcık.send(embedv1);


}