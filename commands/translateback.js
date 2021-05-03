const config = require('../data.json');

module.exports = {
    name: 'unenchant',
    description: "Unenchant your text",
    execute(message, args, Discord, client){

        if(!args[0]) return message.channel.send("Please include some text!").then(m=>{m.delete({timeout:5000}).catch(e =>{});});

        let msg = args.join(' ');

        let translate_map={
            "ᔑ":"a",
            "ʖ":"b",
            "ᓵ":"c",
            "↸":"d",
            "ᒷ":"e",
            "⎓":"f",
            "⊣":"g",
            "⍑":"h",
            "╎":"i",
            "⋮":"j",
            "ꖌ":"k",
            "ꖎ":"l",
            "ᒲ":"m",
            "リ":"n",
            "𝙹":"o",
            "!¡":"p",
            "ᑑ":"q",
            "∷":"r",
            "ᓭ":"s",
            "ℸ ̣ ":"t",
            "⚍":"u",
            "⍊":"v",
            "∴":"w",
            " ̇/":"x",
            "||":"y",
            "⨅":"z",
            " ":" "
        }

        String.prototype.translate = function(){
            return this.replace(/[ᔑʖᓵ↸ᒷ⎓⊣⍑╎⋮ꖌꖎᒲリ𝙹!¡ᑑ∷ᓭℸ ̣ ⚍⍊∴ ̇\/\|\|⨅]/g,
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
            .addField("**Enchanted**", `\`\`\`${msg}\`\`\``)
            .addField("**Unenchanted**", `\`\`\`${msg.translate()}\`\`\``);
        message.channel.send(embed)

    }
}