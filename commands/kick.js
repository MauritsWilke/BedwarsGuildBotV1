module.exports = {
    name: 'kick',
    description: "Kick members.",
    execute(message, args) {

        if (message.member.permissions.has("KICK_MEMBERS")) {

            const member = message.mentions.users.first();
            const reason = args.slice(1).join(' ');

            if (member) {
                const memberTarget = message.guild.members.cache.get(member.id);

                memberTarget.kick(reason).catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because I am missing permissions.`)); return;

                message.reply(args[0] + " has been kicked.");
            } else {
                message.reply("Please include an @ of a member to kick");
            }

        } else {
            message.channel.send('You do not have the permission to use this command, please contact a server admin if you think this is incorrect.');
        }
    }
}