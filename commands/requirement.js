var config = require("../data.json");
const fetch = require('node-fetch');
const utils = require('../utils.js');

module.exports = {
    name: 'reqs',
    description: "Check if you meet the requirements",
    async execute(message, args, Discord, client){

        if(!args[0]) return message.channel.send("Please include a username!").then(m=>{m.delete({timeout:5000}).catch(e =>{});});

        let player = await utils.returnHypixelData(args[0]).then(p =>{

            let star = p.player.achievements.bedwars_level;
            let FKDR = p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars;
            let index = (star * FKDR * FKDR)/10;
            let daysBetween = Math.floor((new Date() - new Date(p.player?.lastLogin))/(1000*60*60*24))
            let playerDiscord = p.player?.socialMedia?.links?.DISCORD;

            if(Promise.resolve(message.guild.members.fetch(client.users.cache.get(playerDiscord)?.id)) !== undefined) meetsOne = ':white_check_mark:';
            else meetsOne = `:x:`;
            if(daysBetween < 7) meetsTwo = ':white_check_mark:';
            else meetsTwo = `:x:`;
            if(index > 30) meetsThree = ':white_check_mark:';
            else meetsThree = `:x:`;
            if(index > 30 && daysBetween < 7) colour = '#55FF55';
            else colour = '#FF5555';

            const newEmbed = new Discord.MessageEmbed()
                .setColor(colour)
                .setTitle('Requirement Score Of ' + p.player.displayname.replace(/_/g, '\\_'))
                .setAuthor(config.name, client.user.displayAvatarURL())
                .setThumbnail(`https://minotar.net/helm/${p.player.uuid}`)
                .addFields(
                    { name: 'In The Discord', value: `${meetsOne} ${playerDiscord}`, inline: false},
                    { name: 'Active at least once a week', value: `${meetsTwo} Last login at ${new Date(p.player.lastLogin).toString().slice(4,15)}`, inline: false},
                    { name: 'Index score of 30+ ', value: `${meetsThree} ${utils.NaNtoZero(index.toFixed(2))}`, inline: false},
                )
                .setTimestamp()
                .setFooter(config.name + "\nDisclaimer: does not actually check if user is in discord cuz im bad at programming pls send help\n");
            message.channel.send(newEmbed);

        }).catch(e => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(`#FF5555`)
                .setTitle(e)
                .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(errorEmbed);
        });
    }
}