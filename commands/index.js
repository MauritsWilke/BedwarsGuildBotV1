const DATA = require('../data.json');
const fetch = require('node-fetch');
const colours = require('../colours.json');

module.exports = {
    name: 'index',
    description: "Does what the name says it does ....",
    async execute(message, args, Discord, client){
    
        if(!args[0]){ message.channel.send("Please include a username!"); return;}
        
        const getID = async (username) => {
            const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            if(response.status !== 200){
                message.channel.send("That's not a valid username!"); return;
            }
            const data = await response.json();
            return data.id;
        };
        const hyData = async (playerUUID) => {
            const response = await fetch(`https://api.hypixel.net/player?uuid=${playerUUID}&key=${DATA.hypixelAPIKey}`);
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
        let UUID = await getID(args[0]);
        let playerHead = `https://minotar.net/helm/${UUID}`
        let playerData = await hyData(UUID);
        if(!playerData || !playerHead || !UUID) return;
        else {

        let playerName = playerData?.player?.displayname;    
        let playerStar = playerData?.player?.achievements?.bedwars_level;
        let playerFKDR = (playerData?.player?.stats?.Bedwars?.final_kills_bedwars / playerData?.player?.stats?.Bedwars?.final_deaths_bedwars).toFixed(2);
        let indexScore = ((playerStar *playerFKDR*playerFKDR)/10).toFixed(2);
        let colour = colours[Math.floor(playerStar/100)];

        const newEmbed = new Discord.MessageEmbed()
        .setColor(colour)
        .setTitle('Index Score of ' + playerName.replace(/_/g, '\\_'))
        .setAuthor(DATA.name, client.user.displayAvatarURL())
        .setThumbnail(playerHead)
        .addFields(
            { name: 'Star', value: playerStar, inline: false},
            { name: 'FKDR', value: NaNtoZero(playerFKDR), inline: false},
            { name: 'Index', value: NaNtoZero(indexScore), inline: false},
        )
        .setTimestamp()
        .setFooter(DATA.name);
    
        message.channel.send(newEmbed);
        }
    }
}