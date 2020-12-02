const Discord = require('discord.js');
const qdb = require('quick.db');
const ms = require("ms");
const ayarlar = require('../../config.json');

exports.run = async (client, message, args) => {    



var muterole1 = qdb.fetch(`muteroluid_${message.guild.id}`);
var muterole2 = message.guild.roles.cache.find(r => r.id === muterole1);
if (!muterole2) {
    try {
   
     muterole2 = await message.guild.roles.create({ 
            data: {
                name: "Muted",
                color: "#1800FF",
                permissions: []
              },
            reason: 'Mute Rolü!' 
            })

        qdb.set(`muteroluid_${message.guild.id}`, muterole2.id);

        message.guild.channels.cache.forEach(async (channel) => {
            await channel.createOverwrite(muterole2, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
                  CONNECT: false
              });
          });

} catch (err) {
    console.log(err);
}

};

var kisi = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!kisi) return message.reply("Susturmam İçin Bir Kullanıcı Belirtiniz!");

var time = args[1];
var reason = args.slice(2).join(" ")

if (!time) {
    if(reason){
        await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **SINIRSIZ** Şekilde Susturuldu!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);
    } else {
        await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **SINIRSIZ** Şekilde Susturuldu!\nYetkili: **${message.author}**`);
    };

} else {
    
    if(reason){
        await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **${time}** Süresince Şekilde Susturuldu!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);
       
       
           setTimeout(function() {
            if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                kisi.roles.remove(muterole2.id)
              message.channel.send(`${kisi} Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`)
            }
           }, ms(time));

    } else {
        await kisi.roles.add(muterole2.id);
        message.channel.send(`${kisi} **${time}** Süresince Şekilde Susturuldu!\nYetkili: **${message.author}**`);

        setTimeout(function() {
            if(kisi.roles.cache.find(r => r.id === muterole2.id)){
                kisi.roles.remove(muterole2.id)
              message.channel.send(`${kisi} Susturulma Süresi Dolduğu İçin Susturulması Kaldırılmıştır.`)
            }
           }, ms(time));
    }
};


};

exports.conf = {
  aliases: ['sustur',],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Sunucudaki Bir Kişiyi Susuturur.',
  usage: 'mute {@kullanici} {zaman} {sebep}'
};