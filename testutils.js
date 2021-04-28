const utils = require('./utils.js');

(async()=>{
        const player = await utils.returnHypixelData("de_grote")
        .then(p => {
            console.log(p.player.displayname)
        })
        .catch(e => {return console.log(e);});
})()