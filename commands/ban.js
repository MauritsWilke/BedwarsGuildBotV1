const config = require('../data.json')

module.exports = {
    name: 'ban',
    description: "Ban members.",
    execute(message, args, Discord, client) {

        if (message.member.permissions.has("BAN_MEMBERS")) {
            const member = message.mentions.users.first();
            let reason = "None";
            if(args[1]){
                reason = args.slice(1).join(' ');
            }

            if(member){
                if(member.id == client.user.id){
                
                    const cantBanSelf = new Discord.MessageEmbed()
                    .setTitle("Cannot ban the bot itself")
                    .setDescription("Sorry you just cant")
                    .setTimestamp()
                    .setFooter(config.name + '     ');
                    message.channel.send(cantBanSelf);
                    return;
    
                }else if(member.id == message.author.id){
    
                    const cantBanSelf = new Discord.MessageEmbed()
                    .setTitle("Cannot ban yourself")
                    .setDescription("Sorry you just cant")
                    .setTimestamp()
                    .setFooter(config.name + '     ');
                    message.channel.send(cantBanSelf);
                    return;
    
                }
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.ban({ days: 0, reason: reason }).catch(error => message.channel.send(`Sorry ${message.author} I couldn't ban because I am missing permissions.`));
                
                const hasBeenBanned = new Discord.MessageEmbed()
                .setTitle(`Ban succesfull`)
                .addFields(
                    { name: 'User banned:', value: member, inline: true},
                    { name: 'Reason:', value: reason, inline: false},
                    { name: 'Banned by:', value: message.author, inline: true}                    
                )
                .setTimestamp()
                .setFooter(config.name + '     ');
                message.channel.send(hasBeenBanned);
                return; 
            
            }else {
                message.reply("Please include an @ of a member to kick");
            }
            } else {
            message.channel.send('You do not have the permission to use this command, please contact a server admin if you think this is incorrect.');
        }
    }
}