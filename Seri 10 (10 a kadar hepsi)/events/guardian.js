const Discord = require('discord.js');
const moment = require('moment');
const chalk = require('chalk');
const { prefix } = require('../config.json')
const qdb = require('quick.db');
let tarih = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});

module.exports = member => {

    var channel = qdb.fetch(`guvenlikkanali_${member.guild.id}`);
    var text = qdb.fetch(`guvenlikyazi_${member.guild.id}`);

    var kanalcık = member.guild.channels.cache.get(channel);  
    
    if(!kanalcık) return;
    
    var SAFErandomMesajlar = [
        "Kişi Güvenli ",
        "Mis Miss Güvenlisin "
    ]
       var SAFErandomMesajlar1 = SAFErandomMesajlar[Math.floor(Math.random() * (SAFErandomMesajlar.length))]
        var DANGERrandomMesajlar = [
            "Kişi Tehlikeli ",
            "Çok Tehlikeli Geldin Haa "
        ]        
            var DANGERrandomMesajlar1 = DANGERrandomMesajlar[Math.floor(Math.random() * (DANGERrandomMesajlar.length))]
        
        var kurulus = new Date().getTime() - member.user.createdAt.getTime()

        let durumMesajı;
        let durum;

        if(kurulus > 2629800000)  durumMesajı = SAFErandomMesajlar1
        if(kurulus > 2629800000)  durum = "Güvenli"

        if(kurulus < 2629800000)  durumMesajı = DANGERrandomMesajlar1
        if(kurulus < 2629800000)  durum = "Tehlikeli"

        if(text)  var textcik = text.replace("{guild}", `**${member.guild}**`).replace("{user}", `**${member.user.username}**`).replace("{durum}", `**${durum}**`)
        var textcikcik = text ? textcik : durumMesajı;
        


    if(!kanalcık) return;

    var embedv1 = new Discord.MessageEmbed()
    .setColor("#BA75E5")
    .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    .setTitle("Kullanıcı Başarıyla Test Edildi")
    .setThumbnail(member.guild.iconURL({dynamic: true, format: "png", size: 1024}))
    .setDescription(textcikcik)
    .setTimestamp()
    .addField("Log Detayları", `Katılan Kişi: **${member}**\nSunucuya Giriş Tarihi: **${tarih}**\Güvenlik Durumu: **${durum}**`)

    return kanalcık.send(embedv1);




}