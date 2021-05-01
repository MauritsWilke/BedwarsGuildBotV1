const config = require('../../data.json');
const utils = require('../../utils.js');
const colours = require('../../colours.json');

module.exports = {
    name: 'page',
    description: "Testing pages",
    async execute(message, args, Discord, client){
    
        const embedOne = new Discord.MessageEmbed()
            .setColor(`#FAFAFA`)
            .setTitle(`Title page 1`)
            .addFields(
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
                { name: 'PAGE1', value: "page1", inline: true},
            )
            .setTimestamp()
            .setFooter(config.name, client.user.displayAvatarURL());

        const embedTwo = new Discord.MessageEmbed()
            .setColor(`#FAFAFA`)
            .setTitle(`Title page 2`)
            .addFields(
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
                { name: 'PAGE2', value: "page2", inline: true},
            )
            .setTimestamp()
            .setFooter(config.name, client.user.displayAvatarURL());

    }
}