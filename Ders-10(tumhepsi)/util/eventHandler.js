const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
    client.on("ready", () => reqEvent("ready")(client, "message"));
    client.on("message", reqEvent("message"));
    client.on("guildMemberAdd", reqEvent("joining"))
    client.on("guildMemberRemove", reqEvent("removing"));
    client.on("guildMemberAdd", reqEvent("autorole"));
    client.on("guildMemberAdd", reqEvent("guardian"));
    //client.on("guildMemberAdd", reqEvent("invites"));

}