const Discord = require('discord.js');
const qdb = require('quick.db');

exports.run = (client, message, args) => {

    var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
    if(!args[0]) return message.reply("Bir Seçenek Belirtiniz **ayarla / sıfırla**")

    if(args[0] == "ayarla" || args[0] == "aç") {

        if(!channel) return message.reply("Bir Kanal Belirtiniz!")

        qdb.set(`giriskanali_${message.guild.id}`, channel.id)
       return message.channel.send("HG-BB Kanalı Başarıyla Aylandı.")

    }
  

    if(args[0] == "sıfırla" || args[0] == "kapat") {

        qdb.delete(`giriskanali_${message.guild.id}`)
        return message.channel.send("HG-BB Kanalı Başarıyla Sıfırlandı.")
        
    }


};


exports.conf = {
  aliases: ["hg-bb","hgbb"],
  permLevel: 0
};

exports.help = {
  name: 'giriş-çıkış',
  description: 'Botun Pingini Gösterir !',
  usage: 'giriş-çıkış {seçenek} {kanal}'
};