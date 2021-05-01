const { DiscordAPIError } = require('discord.js');
const config = require('../data.json');

module.exports = {
    name: 'ping',
    description: "Test command from first day :)",
    execute(message, args, Discord, client){

        const newEmbed = new Discord.MessageEmbed()
            .setColor(config.colour)
            .setTitle("Ping")
            .setAuthor(config.name, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: '**Ping**', value: `${client.ws.ping}ms`, inline: false},
                { name: '**Roundtrip Latency**', value: `Pinging...`, inline: false}
            )
            .setTimestamp()
            .setFooter(config.name);

        message.channel.send(newEmbed).then(m => {
            
            const editedEmbed = new Discord.MessageEmbed()
                .setColor(config.colour)
                .setTitle("Ping")
                .setAuthor(config.name, client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: '**Ping**', value: `${client.ws.ping}ms`, inline: false},
                    { name: '**Roundtrip Latency**', value: `${m.createdTimestamp - message.createdTimestamp}ms`, inline: false}
                )
                .setTimestamp()
                .setFooter(config.name);
            m.edit(editedEmbed).catch(e =>{});
        });

    }
}