var config = require("../data.json");
const fetch = require('node-fetch');
const { GuildMember, Guild } = require("discord.js");

module.exports = {
    name: 'reqs',
    description: "Invitation link for the bot",
    async execute(message, args, Discord, client){

        if(!args[0]){ message.channel.send("Please include a username!"); return;}

        const getID = async (username) => {
            const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
            if(response.status !== 200){
                message.channel.send("That's not a valid username!"); return;
            }
            const data = await response.json();
            return data;
        };
        const hyData = async (playerUUID) => {
            const response = await fetch(`https://api.hypixel.net/player?uuid=${playerUUID}&key=${config.hypixelAPIKey}`);
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
        const checkForDiscord = () =>{
            if(playerData?.player?.socialMedia?.links?.DISCORD){
                playerDiscordName = playerData.player.socialMedia.links.DISCORD; 

                if(message.guild.members.fetch({query: playerDiscordName})){
                    return [playerDiscordName, true]
                }

                return [playerDiscordName, false]
                
            };
            playerDiscordName = "This player has not linked their discord"; return [playerDiscordName, false];
        }

        let apiData = await getID(args[0]);
        let playerHead = `https://minotar.net/helm/${apiData.id}`
        let playerData = await hyData(apiData.id);

        if(!playerData || !playerHead || !apiData.id){message.channel.send("Something went wrong, please try again later."); return;}
        else {

        let playerName = playerData?.player?.displayname;    
        let playerStar = playerData?.player?.achievements?.bedwars_level;
        let playerFKDR = (playerData?.player?.stats?.Bedwars?.final_kills_bedwars / playerData?.player?.stats?.Bedwars?.final_deaths_bedwars).toFixed(2);
        let indexScore = ((playerStar *playerFKDR*playerFKDR)/10).toFixed(2);
        let lastJoined = new Date(playerData?.player?.lastLogin);
        let currentDate = new Date();
        let daysBetween = Math.floor((currentDate - lastJoined)/(1000*60*60*24));
        let playerDiscord = checkForDiscord();

        let colour = '#FF5555';
        let meetsOne = `:x:`;
        let meetsTwo = `:x:`;
        let meetsThree = `:x:`;
                                                                        
        if(playerDiscord[1] !== false) meetsOne = ':white_check_mark:';
        if(daysBetween < 7) meetsTwo = ':white_check_mark:';
        if(indexScore > 30) meetsThree = ':white_check_mark:';
        if(indexScore > 30 && daysBetween < 7 && checkForDiscord() !== "This player has not linked their discord") colour = '#55FF55';
        if(playerName === undefined){
            const notPlayed = new Discord.MessageEmbed()
            .setColor(`#FF5555`)
            .setTitle(apiData.name + ' has not joined Hypixel')
            .setAuthor(config.name, client.user.displayAvatarURL())
            .setThumbnail(playerHead)
            .setTimestamp()
            .setFooter(config.name);

            message.channel.send(notPlayed)
            return;
        }

        const newEmbed = new Discord.MessageEmbed()
        .setColor(colour)
        .setTitle('Requirement Score Of ' + apiData.name.replace(/_/g, '\\_'))
        .setAuthor(config.name, client.user.displayAvatarURL())
        .setThumbnail(playerHead)
        .addFields(
            { name: 'In The Discord', value: `${meetsOne} ${playerDiscord[0]}`, inline: false},
            { name: 'Active at least once a week', value: `${meetsTwo} Last login at ${lastJoined.toString().slice(4,15)}`, inline: false},
            { name: 'Index score of 30+ ', value: `${meetsThree} ${NaNtoZero(indexScore)}`, inline: false},
        )
        .setTimestamp()
        .setFooter(config.name);
    
        message.channel.send(newEmbed);

        }
    }
}