const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const { prefix, official_bymayfe, mailUsername, mailPasscode } = require("./config.json");
const AsciiTable = require('ascii-table');
const fs = require("fs");
require('./util/eventHandler.js')(client);
const qdb = require("quick.db");
let tarih = new Date().toLocaleString("tr-TR", { timeZone: "Asia/Istanbul"});
const nodemailer = require("nodemailer");

/////TABLES
var commandtable = new AsciiTable('MayFe Command Table');
////


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();



commandtable.setHeading("Command", 'Status', "Aliases")
fs.readdirSync('./commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const komutcuklar = require(`./commands/${dir}/${file}`);




  if (komutcuklar.help.name) {
  client.commands.set(komutcuklar.help.name, komutcuklar);
  commandtable.addRow(komutcuklar.help.name, "✔️", komutcuklar.conf.aliases)
} else {
  commandtable.addRow(komutcuklar.help.name, "❌")
  continue;
    }


    
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });
  }
})
console.log(commandtable.toString())







client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === official_bymayfe) permlvl = 4;
  return permlvl;
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam!');
  }
});






var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailUsername,
    pass: mailPasscode
  }
});

client.transporter = new Discord.Collection();
client.transporter.set(transporter);


transporter.verify(function (err, succes) {

if (err) throw err;

if(succes) console.log("Maile Bağlanıldı");

}) 


/*
var mailOptions = {
  from: '@gmail.com',
  to: '@gmail.com',
  subject: 'Deneme 123',
  text: 'Bu bir denemedir! asflıasdashlkahlkshklf hkaskhfahkslfhkliashkfli'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Mail Gönderildi: ' + info.response);
  }
});

*/

client.login(config.token);