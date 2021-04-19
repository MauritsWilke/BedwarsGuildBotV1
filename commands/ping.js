module.exports = {
    name: 'ping',
    description: "Test command from first day :)",
    execute(message, args){

        message.channel.send('pong uwu');

    }
}