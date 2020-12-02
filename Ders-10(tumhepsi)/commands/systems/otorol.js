const Discord = require('discord.js');
const qdb = require('quick.db');

exports.run = (client, message, args) => {


    if(!args[0]) return message.reply("Bir Seçenek Belirtiniz! Eğer Kullanımı Bilmiyorsanız **otorol yardım** yazınız!")

    if(args[0] == "ayarla" || args[0] == "aç") {

        if(!args[1]) message.reply("Lütfen Hangi Sistemi Açacağınızı Belirtiniz (**kanal / rol / yazı**)");

        if(args[1] == "kanal" || args[1] == "channel") {
            var channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);
            if(!channel) return message.reply("Bir Kanal Belirtiniz!")
            qdb.set(`otorolkanali_${message.guild.id}`, channel.id)
            return message.channel.send("Otorol Kanalı Başarıyla Aylandı.")
        }

        if(args[1] == "rol" || args[1] == "role") {
            var role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
            if(!role) return message.reply("Bir Rol Belirtiniz!")
            qdb.set(`otorol_${message.guild.id}`, role.id)
            return message.channel.send("Otorol Başarıyla Aylandı.")
        }

        if(args[1] == "yazı" || args[1] == "text") {
            var text = args.slice(2).join(" ")
            if(!text) return message.reply("Lütfen Bir Yazı Giriniz! \n **(Kullanıcıları Belitmek İçin {user} Kullanınız. Sunucyu Belitmek İçin {guild} Kullanınız.)**")
            if(text.length > 1800) return message.reply("1800 Karakteri Geçmeyiniz!")
            qdb.set(`otorolyazi_${message.guild.id}`, text)
            return message.channel.send("Otorol Yazısı Başarıyla Aylandı.")
        }
    }

    if(args[0] == "sıfırla" || args[0] == "kapat") {


        if(!args[1]) message.reply("Lütfen Hangi Sistemi Kapatacağınızı Belirtiniz (**kanal / rol / yazı**)");

        if(args[1] == "kanal" || args[1] == "channel") {
                qdb.delete(`otorolkanali_${message.guild.id}`)
            return message.channel.send("Otorol Kanalı Başarıyla Sıfırlandı.")
        }

        if(args[1] == "rol" || args[1] == "role") {
            qdb.delete(`otorol_${message.guild.id}`)
            return message.channel.send("Otorol Başarıyla Sıfırlandı.")
        }

        if(args[1] == "yazı" || args[1] == "text") {
            qdb.delete(`otorolyazi_${message.guild.id}`, text)
            return message.channel.send("Otorol Yazısı Başarıyla Sıfırlandı.")
        }    
    }

    if(args[0] == "yardım" || args[0] == "help") {

        let embedv1 = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
        .setTitle("Otorol Komutu Yardımı")
        .setDescription(`

            otorol ayarla kanal #kanal/kanalid 
            otorol ayarla rol @rol/rolid
            otorol ayarla yazı yazınız 
            **(Kullanıcıları Belitmek İçin {user} Kullanınız. Sunucyu Belitmek İçin {guild} Kullanınız.)**

            otorol sıfırla kanal
            otorol sıfırla rol
            otorol sıfırla yazı

            otorol yardım
        
        `)
        return message.channel.send(embedv1);
    }
  

};


exports.conf = {
  aliases: ["auto-role","oto-rol","auto-rol","oto-role"],
  permLevel: 3
};

exports.help = {
  name: 'otorol',
  description: 'Botun Pingini Gösterir !',
  usage: ''
};