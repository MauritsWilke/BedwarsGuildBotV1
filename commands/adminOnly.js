module.exports = {
    name: 'isadmin',
    description: "Check if author is Admin",
    execute(message, args){

        if(message.member.roles.cache.some(role => role.name === 'Admin')){
            message.channel.send('You are admin uwu :3');
        }else {
            message.channel.send('You do not have the permission to use this command, please contact a server admin if you think this is incorrect.');
        }

    }
}