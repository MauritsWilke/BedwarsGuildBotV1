const { MessageAttachment, Channel } = require("discord.js");
const Canvas = require('canvas');

module.exports = {
    name: 'pixelpic',
    description: "Get a cool and unique profile picture from your skin!",
    execute(message, args, Discord, client){

        if(!args[0]){
            message.channel.send("Please submit a player name! ");
        }else {
            //DONT TOUCH THIS :)
            const canvasWidth = 20;
            const canvasHeight = 20;
            let canvas = Canvas.createCanvas(canvasWidth, canvasHeight);
            let ctx = canvas.getContext("2d");
            ctx.imageSmoothingEnabled = false;

            //GRADIENT
            let grd = ctx.createLinearGradient(0, 15, 0, 0);
            grd.addColorStop(1, "#91C8FF");
            grd.addColorStop(0, "#2A8DD3");
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, 20, 20);

            //IMAGES USED
            (async () => {
                const templateImg = await Canvas.loadImage('./images/20x20template.png');
            });
            (async () => {
                const shading = await Canvas.loadImage('./images/20x20shading.png');
            });
            (async () => {
                const pshading = await Canvas.loadImage('./images/20x20pshading.png');
            });
            (async () => {
                const playerSkin = await Canvas.loadImage(`https://minotar.net/skin/${args[0]}`);
                //BOTTOM LAYER
                ctx.drawImage(playerSkin, 8, 9, 7, 7, 8, 4, 7, 7); //Head (bottom layer)
                ctx.drawImage(playerSkin, 5, 9, 3, 7, 5, 4, 3, 7); //Head Side (bottom layer)
                ctx.drawImage(playerSkin, 36, 52, 3, 7, 12, 13, 3, 7); //Arm Right Side (bottom layer)
                ctx.drawImage(playerSkin, 21, 20, 6, 1, 7, 11, 6, 1); //Chest Neck Small Line (bottom layer)
                ctx.drawImage(playerSkin, 20, 21, 8, 8, 6, 12, 8, 8); //Chest Other (Bottom layer)
                ctx.drawImage(playerSkin, 44, 20, 3, 7, 5, 13, 3, 7); //Arm Left Side (bottom layer)
    
                //TOP LAYER
                ctx.drawImage(playerSkin, 40, 9, 7, 7, 8, 4, 7, 7); //Head (top layer)
                ctx.drawImage(playerSkin, 33, 9, 3, 7, 5, 4, 3, 7); //Head Side (top layer)
                ctx.drawImage(playerSkin, 52, 52, 3, 7, 12, 13, 3, 7); //Arm Right Side (top layer)
                ctx.drawImage(playerSkin, 52, 36, 3, 7, 5, 13, 3, 7); //Arm Left Side (bottom layer)
                ctx.drawImage(playerSkin, 20, 37, 8, 8, 6, 12, 8, 8); //Chest Other (top layer)
                ctx.drawImage(playerSkin, 21, 36, 6, 1, 7, 11, 6, 1); //Chest Neck Small Line (top layer)
    
                //SHADING
                ctx.drawImage(pshading, 0, 0);
            });
                message.channel.send('', new MessageAttachment(canvas.toBuffer()));
        }     
    }
}