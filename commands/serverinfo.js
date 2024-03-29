const config = require('../data.json');

module.exports = {
    name: 'serverinfo',
    description: "Send an embed",
    execute(message, args, Discord, client){

        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        const ifNull = (s) => {
            if(s!==null) return `${s}`
            return 'None'
        }

        const toYN = (s) => {
            if(s == false) return 'No'
            return 'Yes'
        }

        let voiceChannelCount = message.guild.channels.cache.filter(c => c.type === 'voice').size;;

        const newEmbed = new Discord.MessageEmbed()
        .setTitle(message.guild.name + " | Info ")
        .setAuthor(`Generated by ${config.name}`, client.user.displayAvatarURL(), 'https://discord.com/oauth2/authorize?client_id=815986701071548427&scope=bot&permissions=2147483647')
        .setThumbnail(message.guild.iconURL())
        .setColor(config.colour)
        .addFields(
            { name: 'Created At', value: message.guild.createdAt.toString().slice(4,24), inline: false},
            { name: 'Owner', value: message.guild.owner, inline: true},
            { name: 'Members', value: message.guild.memberCount, inline: true},

            { name: 'Region', value: capitalize(message.guild.region.toString()), inline: true},
            { name: 'Text Channels', value: message.guild.channels.cache.size - voiceChannelCount, inline: true},
            { name: 'Voice Channels', value: voiceChannelCount, inline: true},
            { name: 'Rules', value: ifNull(message.guild.rulesChannel), inline: true},

            { name: 'Boosts', value: message.guild.premiumSubscriptionCount, inline: true},
            { name: 'Verified', value: toYN(message.guild.verified), inline: true},
            { name: 'Partnered', value: toYN(message.guild.partnered), inline: true},
        )
        .setTimestamp()
        .setFooter(config.name + '     ');
        
        message.channel.send(newEmbed);
    }
}