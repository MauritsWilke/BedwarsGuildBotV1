var DATA = require("../data.json");

module.exports = {
    name: 'invite',
    description: "Invitation link for the bot",
    execute(message, args, Discord, client){

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Invite ' + DATA.name)
        .setAuthor(DATA.name, client.user.displayAvatarURL())
        .setDescription('Invite the bot here: ' + DATA.inviteLink)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(DATA.name);
        
        message.channel.send(newEmbed);

    }
}