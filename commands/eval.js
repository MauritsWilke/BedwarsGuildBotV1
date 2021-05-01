var config = require("../data.json");

module.exports = {
    name: 'eval',
    description: "Execute code",
    async execute(message, args, Discord, client){
        
        if(message.author.id !== config.ownerID) {
            return message.channel.send("You're not the bot owner *kid*").then(m => m.delete({ timeout: 5000})).catch(e =>{});
        }
        
        if(!args[0]){
            return message.channel.send("Please include code to evalute").then(m => m.delete({ timeout: 5000})).catch(e =>{});
        }

        try {
            const code = args.join(" ");
            const evalCode = await Promise.resolve(eval(code)).then(code => {

                let embed = new Discord.MessageEmbed()
                    .setColor('#55FF55')
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL)
                    .setTitle("Eval")
                    .addField("To eval:", `\`\`\`js\n${String(args.join(" ")).slice(0, 1006)}\n\`\`\``)
                    .addField("Eval:", `\`\`\`js\n${String(code).slice(0, 1006)}\n\`\`\``);
                message.channel.send(embed)
            })
        } catch (e) {
            let embed = new Discord.MessageEmbed()
                .setColor('#FF5555')
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL)
                .setTitle("Error ¯\\_(ツ)_/¯")
                .setDescription(String(e).slice(0, 1024))
            message.channel.send(embed)
        }
    }
}