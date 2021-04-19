var DATA = require("../data.json");
const Discord = require('discord.js');
const gm  = new Discord.GuildMember();

module.exports = {
    name: 'member',
    description: "😔😔😔😔",
    execute(message, args, Discord, client){

        console.log(args[0].joinedAt)
    
        const byeEmbed = new Discord.MessageEmbed()
        .setTitle("Farewell, " + args[0].username)
        .setThumbnail(args[0].avatarURL)
        .setColor(DATA.colour)
        .addFields(
            { name: 'Joined at: ', value: gm.joinedAt, inline: false},
            { name: 'Left at: ', value: new Date().toString().slice(4,24), inline: false},
        )
        .setTimestamp()
        .setFooter(DATA.name + '     ');
        
        message.channel.send(byeEmbed)

    }
}