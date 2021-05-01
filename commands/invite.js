var config = require("../data.json");

module.exports = {
    name: 'invite',
    description: "Invitation link for the bot",
    execute(message, args, Discord, client){

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        //.setTitle('Invite ' + config.name)
        .setAuthor(config.name, client.user.displayAvatarURL())
        .setDescription(`Click [here](${config.inviteLink}) to invite the bot!`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(config.name);
        
        message.channel.send(newEmbed);

    }
}