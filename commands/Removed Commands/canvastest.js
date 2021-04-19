const { MessageAttachment } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
    name: 'test',
    description: "Get a cool and unique profile picture from your skin!",
    execute(message, args, Discord, client){
        //VARIABLES
        const canvasWidth = 320;
        const canvasHeight = 320;

        //CANVAS SHIT
        let canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
        let ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        (async () => {
            const background = await Canvas.loadImage('./images/20x20template.png');
            ctx.drawImage(background, 0, 0, 320, 320);
            const attachment = new MessageAttachment(canvas.toBuffer())
            message.channel.send('', attachment);
        })();

        //Actual Discord Things ---------------------------------------------
        
        
    }
}