var config = require("../data.json");

module.exports = {
    name: 'invite',
    description: "Invitation link for the bot",
    execute(message, args, Discord, client){

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        //.setTitle('Invite ' + config.name)
        .setAuthor(config.name, client.user.displayAvatarURL())
        .setDescription(`Click [here](${config.inviteLink}) to invite the bot!\nClick [here](${config.inviteLinkAdmin}) to invite the bot with admin perms (kick and ban commands)`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setFooter(config.name);
        
        message.channel.send(newEmbed);

    }
}