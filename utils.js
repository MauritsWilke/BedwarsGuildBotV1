const fetch = require('node-fetch');
const config = require('./data.json')

module.exports = {
    getMojangData: async (username) => {
        if(!username.match(/[a-z]*\d*_/i)) return "Invalid username";
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        if(response.status !== 200) return "This user does not exist";
        return await response.json();
    },

    getHypixelData: async (playerUUID) => {
        if(!username.match(/[0-9]*\d*-/i)) return "Invalid UUID";
        const response = await fetch(`https://api.hypixel.net/player?uuid=${playerUUID}&key=${config.hypixelAPIKey}`);
        if(response.status !== 200) return "API Outage";
        else if(response.player === null) return "Player has not joined Hypixel";
        return await response.json();
    },

    returnHypixelData: async (username) => {
        if(!username.match(/[a-z]*\d*_/i)) return "Invalid username";
        if(username.length <= 16){
            const mojangData = await module.exports.getMojangData(username);
            return await module.exports.getHypixelData(mojangData.id);
        }else{
            return await module.exports.getHypixelData(username);
        }
    }
}