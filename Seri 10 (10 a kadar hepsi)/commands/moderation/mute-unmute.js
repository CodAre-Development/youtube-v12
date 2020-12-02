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
if (!kisi) return message.reply("Susturmasını Açmam İçin Bir Kullanıcı Belirtiniz!");

 if(!kisi.roles.cache.find(r => r.id === muterole2.id)) return message.reply("Kişi Daha Önceden Susturulmamış!")

 
var reason = args.slice(1).join(" ")

if(reason){
    await kisi.roles.remove(muterole2.id);
    message.channel.send(`${kisi} Susturulması Açıldı!\nNedeni: **${reason}**\nYetkili: **${message.author}**`);
} else {
    await kisi.roles.remove(muterole2.id);
    message.channel.send(`${kisi}Susturulması Açıldı!\nYetkili: **${message.author}**`);
};


};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unmute',
  description: 'Sunucudaki Bir Kişiyi Susturmasını Kaldırır.',
  usage: 'unmute {@kullanici} {sebep}'
};