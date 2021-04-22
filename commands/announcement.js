var config = require("../data.json");

module.exports = {
    name: 'announcement',
    description: "POG",
    execute(message, args, Discord, client){

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Announcement!')
        .setAuthor(config.name, client.user.displayAvatarURL())
        .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834415883454644244/exmark.png")
        .setDescription("Currently fixing bugs before entire rewrite! \n If you find any bugs you can get the @bugfinder role in the server! \n\n I want to rewrite the entire bot because the code is quite messy as of now and a rewrite would also allow for easier updates :)")
        .setTimestamp()
        .setFooter(config.name)

        
        message.channel.send(newEmbed);
    }
}