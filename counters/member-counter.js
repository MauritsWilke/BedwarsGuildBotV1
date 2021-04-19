module.exports = async (client) =>{
    const guild = client.guilds.cache.get('831936059763720232');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('831936059763720232');
        channel.setName(`Member Count: ${memberCount.toLocaleString()}`);
        console.log(`Member count updated to ${memberCount}`)
    }, 600000);
}