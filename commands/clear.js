const config = require('../data.json')

module.exports = {
    name: 'clear',
    description: "Clear X messages",
    async execute(message, args, Discord, client) {

        if (message.member.permissions.has("MANAGE_MESSAGES")) {

                if (!args[0]) return message.reply("Please enter the amount of messages you want to clear.");
                if (isNaN(args[0])) return message.reply("Please enter a number.");
                if (args[0] > 100) return message.reply("You cannot delete more than 100 messages at a time.");
                if (args[0] < 1) return message.reply("You must delete at least one message.");

                await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages);

                    const doesntExist = new Discord.MessageEmbed()
                    .setColor(config.colour)
                    .setTitle(`Deleted ${args[0]} messages in #${message.channel.name}`)
                    .setDescription(`Deleted by: ${message.author}`)
                    .setAuthor(config.name, client.user.displayAvatarURL())
                    .setTimestamp()
                    .setFooter(config.name);

                    message.channel.send(doesntExist)
                    .then(msg =>{
                        setTimeout(() => msg.delete(), 5000)
                    })

                });
                
        } else {

            message.channel.send('You do not have the permission to use this command, please contact a server admin if you think this is incorrect.');

        }

    }
}