const config = require('../data.json');
const fetch = require('node-fetch');
const colours = require('../colours.json');

module.exports = {
    name: 'uuid',
    description: "Does what the name says it does ....",
    async execute(message, args, Discord, client){
    
        if(!args[0]){ message.channel.send("Please include a username!"); return;}
        
        const getID = async (username) => {
            const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            if(response.status !== 200) return;
            const data = await response.json();
            return data;
        };
        
        let player = await getID(args[0]);
        if(player === undefined){
            const doesntExist = new Discord.MessageEmbed()
            .setColor(`#FF5555`)
            .setTitle(`${args[0]} is not a valid username!`)
            .setAuthor(config.name, client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(config.name);

            message.channel.send(doesntExist)
            return;
        }

        let playerHead = `https://minotar.net/helm/${player.id}`

        if(player.id === undefined){
            return;
        }

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0000AA')
        .setTitle('UUID of ' + player.name.replace(/_/g, '\\_'))
        .setAuthor(config.name, client.user.displayAvatarURL())
        .setThumbnail(playerHead)
        .addFields(
            { name: 'UUID', value: player.id, inline: false}
        )
        .setTimestamp()
        .setFooter(config.name);
    
        message.channel.send(newEmbed);

    }
}