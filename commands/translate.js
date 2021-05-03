const config = require('../data.json');

module.exports = {
    name: 'enchant',
    description: "Translate to enchantment table!",
    execute(message, args, Discord, client){

        if(!args[0]) return message.channel.send("Please include some text!").then(m=>{m.delete({timeout:5000}).catch(e =>{});});

        let msg = args.join(' ');

        let translate_map={
            "a":"ᔑ",
            "b":"ʖ",
            "c":"ᓵ",
            "d":"↸",
            "e":"ᒷ",
            "f":"⎓",
            "g":"⊣",
            "h":"⍑",
            "i":"╎",
            "j":"⋮",
            "k":"ꖌ",
            "l":"ꖎ",
            "m":"ᒲ",
            "n":"リ",
            "o":"𝙹",
            "p":"!¡",
            "q":"ᑑ",
            "r":"∷",
            "s":"ᓭ",
            "t":"ℸ ̣ ",
            "u":"⚍",
            "v":"⍊",
            "w":"∴",
            "x":" ̇/",
            "y":"||",
            "z":"⨅",
            " ":" "
        }

        String.prototype.translate = function(){
            return this.replace(/[a-z]/g,
                function(a){
                    return translate_map[a]
                })
            };

        let embed = new Discord.MessageEmbed()
            .setColor('#AA00AA')
            .setTimestamp()
            .setFooter(config.name, client.user.displayAvatarURL)
            .setThumbnail("https://cdn.discordapp.com/attachments/834039658391928852/838066476946685992/latest.png")
            .setTitle("Enchantment Table")
            .addField("**Enchanting**", `\`\`\`${msg}\`\`\``)
            .addField("**Enchanted**", `\`\`\`${msg.toLowerCase().translate()}\`\`\``);
        message.channel.send(embed)

    }
}