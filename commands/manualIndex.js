var config = require("../data.json");

module.exports = {
    name: 'manualindex',
    description: "Invitation link for the bot",
    execute(message, args, Discord, client){

        if(!args[0] || !args[1] || isNaN(args[0].replace(",",".")) || isNaN(args[1].replace(",","."))){ message.channel.send('Please include a ``Star`` and an ``FKDR``'); return;}
        else{
            let indexScore = (args[0].replace(",",".") * args[1].replace(",",".") * args[1].replace(",","."))/10;
            
            
            const newEmbed = new Discord.MessageEmbed()
            .setColor('#FAFAFA')
            .setTitle('Manual Index Score')
            .setAuthor(config.name, client.user.displayAvatarURL())
            .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/834086824309293097/math.png")
            .addFields(
                { name: 'Star', value: args[0].replace(",","."), inline: true},
                { name: 'FKDR', value: args[1].replace(",","."), inline: true},
                { name: 'Index score', value: indexScore.toFixed(2), inline: false},
            )
            .setTimestamp()
            .setFooter(config.name);
        
            message.channel.send(newEmbed);
        }
    }
}