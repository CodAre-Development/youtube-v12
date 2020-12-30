const Discord = require('discord.js');

exports.run = async(client, message, args) => {
 var guild = message.guild;
 var banlayan = message.author.tag;
 var kisi = message.mentions.users.first() || client.users.resolve(args[0]) || client.users.cache.find(u => u.username === args[0]) || client.users.cache.get(args[0]);
 if(!kisi) return message.reply("Banlayacağım Kişiyi Belirtmen Gerekiyor `ID / @kullanici / username`")
 //var gun = args.slice(1).join(' ') ? `${args.slice(1).join(' ')}` :"";
 var neden = args.slice(1).join(' ') 
 let banxx = await message.guild.fetchBans();

//if (!kisi) return message.reply("Kişi Bulunamadı! Lütfen ID Doğru Giriniz!")


if (!banxx.get(kisi.id)) return message.reply(":x: Kişi Yasaklanmamış")

if(neden) {
  try {
  await message.channel.send(`${kisi.tag} adlı kullanıcının banı açıldı. \nNedeni: **${neden}**`)
  await guild.members.unban(kisi.id, neden);
} catch (error) {
  message.reply("Bir Sorun Oldu Lütfen Botun Geliştiricisi veya Yapımcısıyla İletişime Geçiniz!")
  console.log(error)
}
} else {
  try {
    await message.channel.send(`${kisi.tag} adlı kullanıcının banı açıldı.`)
    await guild.members.unban(kisi.id, neden);
  } catch (error) {
    message.reply("Bir Sorun Oldu Lütfen Botun Geliştiricisi veya Yapımcısıyla İletişime Geçiniz!")
    console.log(error)
  }

}




};


exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Botun Pingini Gösterir !',
  usage: 'ban'
};
