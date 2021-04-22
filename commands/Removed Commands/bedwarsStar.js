/*var config = require("../data.json");
var mojangAPI = require('mojang-api');
const fetch = require("node-fetch");

module.exports = {
    name: 'Abwtest',
    description: "Check if author is Admin",
    execute(message, args) {
        let API_URL = "https://api.hypixel.net/player?key=" + config.hypixelAPIKey + "&uuid=";

        if (args[0]) {

            mojangAPI.nameToUuid(args[0], function (err, res) {
                if (err){
                    console.log(err);
                } else {
                    API_URL += res[0].id;
                    console.log(API_URL);
                    
                    const response = await fetch(API_URL, {
                        method: 'GET',
                        headers: {'Content-Type': '/friends'}
                    });

                }
            });
        } else {
            message.channel.send("Please include a username.");
        }
    }
}*/