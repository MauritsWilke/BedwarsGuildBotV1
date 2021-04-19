var DATA = require("../data.json");

module.exports = {
    name: 'givememylinkcuzimstupid',
    description: "Invitation link for the bot",
    execute(message, args, Discord, client){

        if(message.author.id !== DATA.ownerID){ message.channel.send("You're not the owner of the bot..."); return;}
        else{

        message.channel.send('Look at this idiot forgetting his API link again');

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Here u go u stupid cunt')
        .setAuthor(DATA.name, client.user.displayAvatarURL())
        .setDescription(`https://api.hypixel.net/player?uuid=11456473-de28-4d36-aa7b-4150fe7859ab&key=${DATA.hypixelAPIKey}`)
        .setThumbnail(`https://s3.amazonaws.com/static.graphemica.com/glyphs/i500s/000/010/217/original/004C-500x500.png?1275328224`)
        .setTimestamp()
        .setFooter(DATA.name);
        message.author.send(newEmbed);

        }

    }
}