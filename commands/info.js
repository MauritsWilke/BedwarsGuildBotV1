const config = require('../data.json');
const fetch = require('node-fetch');

module.exports = {
    name: 'info',
    description: "Does what the name says it does ....",
    async execute(message, args, Discord, client){
    
        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(config.name + " Info")
        .setAuthor(config.name, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: 'Ping', value: `${client.ws.ping}ms`, inline: true},
            { name: 'Uptime', value: `${hours}h ${minutes}m ${seconds}s`, inline: true},
            { name: 'Dev', value: `${config.ownerDiscord}`, inline: true},

            { name: 'Servers', value: `${client.guilds.cache.size}`, inline: true},
            { name: 'Channels', value: `${client.channels.cache.size}`, inline: true},
            { name: 'Users', value: `${client.users.cache.size}`, inline: true}
        )
        .setTimestamp()
        .setFooter(config.name);
        
        message.channel.send(newEmbed);

    }
}