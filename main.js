const Discord = require('discord.js');
const fs = require('fs');
var DATA = require("./data.json");
var packageLock = require("./package-lock.json");

const memberCounter = require('./counters/member-counter');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
    console.log(command);
}

client.once('ready', () => {
    console.log(DATA.name + ' is online [ ' + Date().toString().slice(4,24) + ' ]');
    console.log("Running version: " + DATA.version + " using Discord.js version: " + packageLock.packages['node_modules/discord.js'].version);
    // memberCounter(client);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: "!reqs IGN for verification!",
            type: ""
        }
    });
})

client.on('message', message => {
    var date = new Date();
    var timestamp = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' | ' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    if (!message.content.startsWith(DATA.prefix) || message.author.bot) return;
    if (message.guild === null) {
        message.author.send("I am unavailable in DM's, please use me in a server!");
        return;
    }

    const args = message.content.slice(DATA.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        client.commands.get(command).execute(message, args, Discord, client);
        console.log(command + " was used by [" + message.author.username + "] in server [" + message.guild.name + "] at [" + timestamp + "]");
    } catch (error) {
        // message.channel.send('There might have been an error processing this command, or the command does not exist.');
        if (DATA.logErrors) console.log(error);
    };

})

// client.on('guildMemberAdd', guildMember =>{
//     let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Gamer');
 
//     guildMember.roles.add(welcomeRole);
//     guildMember.guild.channels.cache.get('798114509675167767').send(`Welcome to ` + guildMember.guild.name + `, <@${guildMember.user.id}>!`);

// });

client.login(DATA.token);