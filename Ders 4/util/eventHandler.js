const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
    client.on("ready", () => reqEvent("ready")(client, "message"));
    client.on("message", reqEvent("message"));
}