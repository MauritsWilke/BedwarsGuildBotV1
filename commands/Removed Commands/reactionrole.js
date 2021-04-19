module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message.",
    async execute(message, args, Discord, client) {
        const channel = '817013784350294096';
        const firstRole = message.guild.roles.cache.find(role => role.name === "@ Me For Bedwars Party");
        const secondRole = message.guild.roles.cache.find(role => role.name === "@ Me For Any Party");

        const firstRoleEmoji = '✅';
        const secondRoleEmoji = '☑️';

        let embed = new Discord.MessageEmbed()
            .setColor('#5daee8')
            .setTitle('Pick a role here')
            .setDescription('These roles may be @\' if someone wants to party.\n\n'
                + `${firstRoleEmoji} for bedwars parties `
                + `${secondRoleEmoji} for any party`);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(firstRoleEmoji);
        messageEmbed.react(secondRoleEmoji);

        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === firstRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(firstRole);
                }
                if (reaction.emoji.name === secondRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(secondRole);
                } else {
                    return;
                }
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === firstRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(firstRole);
                }
                if (reaction.emoji.name === secondRoleEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(secondRole);
                } else {
                    return;
                }
            }
        });
    }
}