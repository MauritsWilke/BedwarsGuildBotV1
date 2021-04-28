const fetch = require('node-fetch');
const config = require('./data.json')

module.exports = {
    getMojangData: async (username) => {
        if(!username.match(/[a-z]\d*\_*/i)) return Promise.reject(`${username} is an invalid username`);
        const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
        if(response.status !== 200) return Promise.reject(`${username} is not an existing player`);
        return await response.json();
    },

    getHypixelData: async (playerUUID) => {
        console.log(playerUUID)
        if(!playerUUID.match(/[\d-]/i)) return Promise.reject(`Please submit a valid UUID`);
        const response = await fetch(`https://api.hypixel.net/player?uuid=${playerUUID}&key=${config.hypixelAPIKey}`);
        if(response.status !== 200) return Promise.reject(`API Outage`);
        else if(response.player === null) return Promise.reject(`This user has not joined Hypixel`);
        return await response.json();
    },

    returnHypixelData: async (username) => {
        if(username.length <= 16){
                const mojangData = await module.exports.getMojangData(username);
                return await module.exports.getHypixelData(mojangData.id);
        } else {
            return await module.exports.getHypixelData(username);
        }
    },

    NaNtoZero: (s) => {
        if(isNaN(s)) return '0';
        return `${s}`;
    },

}