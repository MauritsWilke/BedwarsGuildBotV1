const config = require('../data.json');
const utils = require('../utils.js');
const colours = require('../colours.json');

module.exports = {
    name: 'index',
    description: "Get your index",
    async execute(message, args, Discord, client){
    
        if(!args[0]) return message.channel.send("Please include a username!").then(m => {m.delete({ timeout: 5000 })}).catch(e);

        let player = await utils.returnHypixelData(args[0]).then(p =>{
            //NEVER PLAYED BEDWARS
            if(!p.player.stats?.Bedwars){
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor(`#FF5555`)
                    .setTitle("This player has not played bedwars")
                    .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
                    //.setAuthor(config.name, client.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL());
                return message.channel.send(errorEmbed)
            }

            let starNeeded = FKDRNeeded = '-';
            if(((p.player.achievements.bedwars_level*(p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars)*(p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars))/10).toFixed(2) < 30){
                starNeeded = ((30 * 10)/((p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars).toFixed(2)*(p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars).toFixed(2))).toFixed(2);
                FKDRNeeded = (Math.sqrt((30 * 10)/p.player.achievements.bedwars_level)).toFixed(2);
            }

            const newEmbed = new Discord.MessageEmbed()
                .setColor(colours[Math.floor(p.player.achievements.bedwars_level/100)])
                .setTitle('Index Score of ' + p.player.displayname.replace(/_/g, '\\_'))
                .setAuthor(config.name, client.user.displayAvatarURL())
                .setThumbnail(`https://minotar.net/helm/${p.player.uuid}`)
                .addFields(
                    { name: 'Star', value: p.player.achievements.bedwars_level, inline: true},
                    { name: 'Needed', value: starNeeded, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'FKDR', value: utils.NaNtoZero((p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars).toFixed(2)), inline: true},
                    { name: 'Needed', value: FKDRNeeded, inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'Index', value: utils.NaNtoZero(((p.player.achievements.bedwars_level*(p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars)*(p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars))/10).toFixed(2)), inline: false},
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

        /*
        let playerHead = ``
        let playerData = await hyData(apiData.id);
        if(!playerData || !playerHead || !apiData.id) return;
        else {

        let playerName = playerData?.player?.displayname;    
        let playerStar = playerData?.player?.achievements?.bedwars_level;
        let playerFKDR = (playerData?.player?.stats?.Bedwars?.final_kills_bedwars / playerData?.player?.stats?.Bedwars?.final_deaths_bedwars).toFixed(2);
        let indexScore = ((playerStar *playerFKDR*playerFKDR)/10).toFixed(2);
        let colour = colours[Math.floor(playerStar/100)];

        if(((p.player.achievements.bedwars_level*(p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars)*(p.player.stats.Bedwars.final_kills_bedwars / p.player.stats.Bedwars.final_deaths_bedwars))/10).toFixed(2) < 30){
            starNeeded = ((30 * 10)/(playerFKDR*playerFKDR)).toFixed(2);
            FKDRNeeded = (Math.sqrt((30 * 10)/playerStar)).toFixed(2);
        }

        const newEmbed = new Discord.MessageEmbed()
        .setColor(colour)
        .setTitle('Index Score of ' + apiData.name.replace(/_/g, '\\_'))
        .setAuthor(config.name, client.user.displayAvatarURL())
        .setThumbnail(playerHead)
        .addFields(
            { name: 'Star', value: playerStar, inline: true},
            { name: 'Needed', value: starNeeded, inline: true},
            { name: '\u200B', value: '\u200B', inline: true},
            { name: 'FKDR', value: NaNtoZero(playerFKDR), inline: true},
            { name: 'Needed', value: FKDRNeeded, inline: true},
            { name: '\u200B', value: '\u200B', inline: true},
            { name: 'Index', value: NaNtoZero(indexScore), inline: false},
        )
        .setTimestamp()
        .setFooter(config.name);
    
        message.channel.send(newEmbed);
        }
        */
    }
}