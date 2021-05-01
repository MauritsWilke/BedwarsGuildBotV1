const config = require('../data.json');
const utils = require('../utils.js');
const colours = require('../colours.json');

module.exports = {
    name: 'index',
    description: "Get your index",
    async execute(message, args, Discord, client){
    
        if(!args[0]) return message.channel.send("Please include a username!").then(m=>{m.delete({timeout:5000}).catch(e =>{});});

        let player = await utils.returnHypixelData(args[0]).then(p =>{
            //NEVER PLAYED BEDWARS
            if(!p.player?.stats?.Bedwars){
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(`#FF5555`)
                    .setTitle(`${p.player.displayname} has not played bedwars`)
                    .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(errorEmbed)
            }

            let starNeeded = FKDRNeeded = '-';
            let star = p.player.achievements.bedwars_level;
            let FKDR = p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars;
            let index = (star * FKDR * FKDR)/10;
            if(index < 30){
                starNeeded = ((30 * 10)/((FKDR*FKDR))).toFixed(2);
                FKDRNeeded = (Math.sqrt((30 * 10)/star)).toFixed(2);
            }

            const newEmbed = new Discord.MessageEmbed()
                .setColor(colours[Math.floor(star/100)])
                .setTitle('Index Score of ' + p.player.displayname.replace(/_/g, '\\_'))
                .setAuthor(config.name, client.user.displayAvatarURL())
                .setThumbnail(`https://minotar.net/helm/${p.player.uuid}`)
                .addFields(
                    { name: 'Star', value: star, inline: true},
                    { name: 'Needed', value: starNeeded, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'FKDR', value: utils.NaNtoZero(FKDR.toFixed(2)), inline: true},
                    { name: 'Needed', value: FKDRNeeded, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'Index', value: utils.NaNtoZero(index.toFixed(2)), inline: false},
                )
                .setTimestamp()
                .setFooter(config.name);
            return message.channel.send(newEmbed);

        }).catch(e => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor(`#FF5555`)
                .setTitle(e)
                .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
                //.setAuthor(config.name, client.user.displayAvatarURL())
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL());
            return message.channel.send(errorEmbed);
        });
    }
}