const Discord = require('discord.js');
const qdb = require('quick.db');

exports.run = (client, message, args) => {


    if(!args[0]) return message.reply("Bir Seçenek Belirtiniz! Eğer Kullanımı Bilmiyorsanız **güvenlik yardım** yazınız!")

if(args[0] == "ayarla" || args[0] == "aç") {
      if(!args[1]) message.reply("Lütfen Hangi Sistemi Açacağınızı Belirtiniz (**kanal / yazı**)");
        if(args[1] == "kanal" || args[1] == "channel") {
            var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);
            if(!channel) return message.reply("Bir Kanal Belirtiniz!")
            qdb.set(`guvenlikkanali_${message.guild.id}`, channel.id)
            return message.channel.send("Güvenlik Kanalı Başarıyla Aylandı.")
        }

        if(args[1] == "yazı" || args[1] == "text") {
            var text = args.slice(2).join(" ")
            if(!text) return message.reply("Lütfen Bir Yazı Giriniz! \n **(Kullanıcıları Belitmek İçin {user} Kullanınız. Sunucyu Belitmek İçin {guild} Kullanınız. Güvenlik Durumunu Belirtmek İçin {durum} Kullanınız.)**")
            if(text.length > 1800) return message.reply("1800 Karakteri Geçmeyiniz!")
            qdb.set(`guvenlikyazi_${message.guild.id}`, text)
            return message.channel.send("Güvenlik Yazısı Başarıyla Aylandı.")
        }
    }

    if(args[0] == "sıfırla" || args[0] == "kapat") {
        if(!args[1]) message.reply("Lütfen Hangi Sistemi Kapatacağınızı Belirtiniz (**kanal / yazı**)");
        if(args[1] == "kanal" || args[1] == "channel") {
                qdb.delete(`guvenlikkanali_${message.guild.id}`)
            return message.channel.send("Güvenlik Kanalı Başarıyla Sıfırlandı.")
        }

        if(args[1] == "yazı" || args[1] == "text") {
            qdb.delete(`guvenlikyazi_${message.guild.id}`, text)
            return message.channel.send("Güvenlik Yazısı Başarıyla Sıfırlandı.")
        }    
    }

    if(args[0] == "yardım" || args[0] == "help") {

        let embedv1 = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        .setTitle("Güvenlik Komutu Yardımı")
        .setDescription(`

            güvenlik ayarla kanal #kanal/kanalid 
            güvenlik ayarla yazı yazınız 
            **(Kullanıcıları Belitmek İçin {user} Kullanınız. Sunucyu Belitmek İçin {guild} Kullanınız. Güvenlik Durumunu Belirtmek İçin {durum} Kullanınız.)**

            güvenlik sıfırla kanal
            güvenlik sıfırla yazı

            güvenlik yardım
        
        `)
        return message.channel.send(embedv1);
    }
  

};


exports.conf = {
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'güvenlik',
  description: 'Botun Pingini Gösterir !',
  usage: ''
};