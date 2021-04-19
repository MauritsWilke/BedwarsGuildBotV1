var DATA = require("../data.json");

module.exports = {
    name: 'changelog',
    description: "Send an embed",
    execute(message, args, Discord, client){

        const newEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Changelog')
        //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('Most recent changelog from version ' + DATA.version)
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: 'Changes made: ', value: DATA.changelog },
            { name: 'Bully cats with this: ', value: DATA.makecatsdothis }
        )
        .setTimestamp()
        .setFooter(DATA.name + '     ');
        
        message.channel.send(newEmbed);
    }
}