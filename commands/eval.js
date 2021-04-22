var config = require("../data.json");

module.exports = {
    name: 'eval',
    description: "Execute code",
    async execute(message, args, Discord, client){
        
        if(message.author.id !== config.ownerID) {
            return message.channel.send("You're not the bot owner *kid*").then(m => m.delete(5000))
        }
        
        if(!args[0]){
            message.channel.send("Please include code to evalute")
        }

        try {
            if(args.join(" ").toLowerCase().includes("token")) {
                return message.channel.send("Nice try, L").then(m => m.delete({ timeout: 5000 }));
            }

            const code = args.join(" ");
            const evalCode = await eval(code).then(code => {
                let embed = new Discord.MessageEmbed()
                    .setColor('#55FF55')
                    .setTimestamp()
                    .setFooter(config.name, client.user.displayAvatarURL)
                    .setTitle("Eval")
                    .addField("To eval:", `\`\`\`js\n${args.join(" ")}\n\`\`\``)
                    .addField("Eval:", `\`\`\`js\n${code}\n\`\`\``);
                message.channel.send(embed)
            })
        } catch (e) {
            let embed = new Discord.MessageEmbed()
                .setColor('#FF5555')
                .setTimestamp()
                .setFooter(config.name, client.user.displayAvatarURL)
                .setTitle("Error ¯\\_(ツ)_/¯")
                .setDescription(e)
            message.channel.send(embed)
        }
    }
}