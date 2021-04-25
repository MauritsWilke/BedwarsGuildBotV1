const config = require('../data.json');
const fetch = require('node-fetch');
const colours = require('../colours.json');

module.exports = {
    name: 'index',
    description: "Does what the name says it does ....",
    async execute(message, args, Discord, client){
    
        if(!args[0]){ message.channel.send("Please include a username!"); return;}
        
        const getID = async (username) => {
            const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            if(response.status !== 200) return;
            const data = await response.json();
            return data;
        };
        const hyData = async (playerUUID) => {
            const response = await fetch(`https://api.hypixel.net/player?uuid=${apiData.id}&key=${config.hypixelAPIKey}`);
            if(response.status !== 200){
                message.channel.send("There might be an API outtage"); return;
            }else if(response.player === null){
                message.channel.send("This player has not joined Hypixel!"); return;
            }
            const player = await response.json();
            return player;
        };
        const NaNtoZero = (s) => {
            if(isNaN(s)) return '0';
            return `${s}`;
        }

        // LET STUFF
        let apiData = await getID(escape(args[0]));
        if(apiData === undefined){
            const doesntExist = new Discord.MessageEmbed()
            .setColor(`#FF5555`)
            .setTitle(`${args[0]} is not a valid username!`)
            .setAuthor(config.name, client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(config.name);

            message.channel.send(doesntExist)
            return;
        }

        let playerHead = `https://minotar.net/helm/${apiData.id}`
        let playerData = await hyData(apiData.id);
        if(!playerData || !playerHead || !apiData.id) return;
        else {

        let playerName = playerData?.player?.displayname;    
        let playerStar = playerData?.player?.achievements?.bedwars_level;
        let playerFKDR = (playerData?.player?.stats?.Bedwars?.final_kills_bedwars / playerData?.player?.stats?.Bedwars?.final_deaths_bedwars).toFixed(2);
        let indexScore = ((playerStar *playerFKDR*playerFKDR)/10).toFixed(2);
        let colour = colours[Math.floor(playerStar/100)];
        let starNeeded = "-";
        let FKDRNeeded = "-";

        if(indexScore < 30){
            starNeeded = ((30 * 10)/(playerFKDR*playerFKDR)).toFixed(2);
            FKDRNeeded = (Math.sqrt((30 * 10)/playerStar)).toFixed(2);
        }

        if(playerStar === undefined){
            const notPlayed = new Discord.MessageEmbed()
            .setColor(`#FF5555`)
            .setTitle(apiData.name + ' has not played bedwars')
            .setAuthor(config.name, client.user.displayAvatarURL())
            .setThumbnail(playerHead)
            .setTimestamp()
            .setFooter(config.name);

            message.channel.send(notPlayed)
            return;
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
    }
}