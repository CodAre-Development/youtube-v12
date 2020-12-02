const Discord = require('discord.js');


exports.run = async (client, message, args) => {

    var kisi = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if(!kisi) return message.reply("Lütfen Sunucudan Atacağım Kişiyi Belirtiniz! \n veya Kişi Sunucuda Yok!");
    if(!message.guild.member(kisi).kickable) return message.reply("Bu Kişi Kickleyemem!");
    var reason =  args.slice(1).join(' ');
     message.guild.member(kisi).kick(reason);
    var reason2 = reason ? reason : "Neden Belirtilmemiş";

    var embedv1 = new Discord.MessageEmbed()
    .setColor("#BA75E5")
    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
    .addField("Kicklenen Kişi ve Sebebi", `Kicklenen Kişi: **${kisi}**\nKicklenme Nedeni: **${reason2}**`)

    return message.channel.send(embedv1);
};


exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Sunucudan Birini Atar',
  usage: 'kick {user} reason'
};