const Discord = require('discord.js');

exports.run = (client, message, args) => {

var embesil = new Discord.MessageEmbed()
.setColor('#c66276')
.setTitle(`${message.author.tag} adlı kullanıcının Profil Fotusu`)
.setAuthor(message.author.username, message.author.avatarURL({ size:1024, dynamic:true, format: 'png'}))
.setDescription(`${message.author.tag} isimli kullanıcı profil fotografını istedi`)
.setImage(message.author.avatarURL( { size:1024, dynamic:true, format: 'png'} ))
message.channel.send(embesil)

};


exports.conf = {
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'pp',
  description: 'Botun Pingini Gösterir !',
  usage: 'ping'
};