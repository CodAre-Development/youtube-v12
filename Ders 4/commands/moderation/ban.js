const Discord = require('discord.js');

exports.run = async(client, message, args) => {

 var guild = message.guild;
 var banlayan = message.author.tag;
 if (!args[0]) return message.reply("Banlayacağım Kişiyi Etiketlemen Gerek!");
 var kisi = message.mentions.users.first() || guild.members.cache.find(u => u.username === args[0]) || guild.members.cache.get(args[0]);
 //var gun = args.slice(1).join(' ') ? `${args.slice(1).join(' ')}` :"";
 var neden = args.slice(1).join(' ') ? `${args.slice(1).join(' ')} Banlayan: ${banlayan}` : `Neden Belirtilmemiş.  Banlayan: ${banlayan}`

if (!kisi) return message.reply("Kişi Sunucuda Bulunamadı!")

 await kisi.send(`${guild} adlı sunucudan banlandınız. \nNedeni: ${neden}`)
 await message.channel.send(`${kisi} banlandı. \nNedeni: ${neden}`)
 await guild.members.ban(kisi, { reason: neden/*, days: gun*/});



};


exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Botun Pingini Gösterir !',
  usage: 'ban'
};
