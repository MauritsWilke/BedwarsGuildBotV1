const config = require('../data.json')

module.exports = {
    name: 'kick',
    description: "Kick members.",
    execute(message, args, Discord, client) {

        if (message.member.permissions.has("KICK_MEMBERS")) {
            const member = message.mentions.users.first();
            let reason = "None";
            if(args[1]){
                reason = args.slice(1).join(' ');
            }

            if(member){
                if(member.id == client.user.id){
                
                    const cantKickSelf = new Discord.MessageEmbed()
                    .setTitle("Cannot kick the bot itself")
                    .setDescription("Sorry you just cant")
                    .setTimestamp()
                    .setFooter(config.name + '     ');
                    message.channel.send(cantKickSelf);
                    return;
    
                }else if(member.id == message.author.id){
    
                    const cantKickSelf = new Discord.MessageEmbed()
                    .setTitle("Cannot kick yourself")
                    .setDescription("Sorry you just cant")
                    .setTimestamp()
                    .setFooter(config.name + '     ');
                    message.channel.send(cantKickSelf);
                    return;
    
                }
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick({ days: 0, reason: reason }).catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because I am missing permissions.`));
                
                const hasBeenKicked = new Discord.MessageEmbed()
                .setTitle(`Kicked succesfull`)
                .addFields(
                    { name: 'User kicked:', value: member, inline: true},
                    { name: 'Reason:', value: reason, inline: false},
                    { name: 'Kicked by:', value: message.author, inline: true}                    
                )
                .setTimestamp()
                .setFooter(config.name + '     ');
                message.channel.send(hasBeenKicked);
                return; 
            
            }else {
                message.reply("Please include an @ of a member to kick");
            }
            } else {
            message.channel.send('You do not have the permission to use this command, please contact a server admin if you think this is incorrect.');
        }
    }
}