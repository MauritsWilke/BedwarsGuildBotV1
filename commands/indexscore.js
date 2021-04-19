var DATA = require("../data.json");

module.exports = {
    name: 'manualindex',
    description: "Invitation link for the bot",
    execute(message, args, Discord, client){

        if(!args[0] || !args[1]){ message.channel.send('Please include a ``Star`` and an ``FKDR``'); return;}
        else{
            let indexScore = (args[0].replace(",",".") * args[1].replace(",",".") * args[1].replace(",","."))/10;
            message.channel.send(indexScore.toFixed(2));
        }
    }
}