const Discord = require("discord.js");
const color = require("./color");

const TOKEN = process.env.BOT_TOKEN;
const PREFIX = "!!";
const start_time = Date.now();

const LIMIT = 3;

const ILLEGAL = [
    "🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", 
    "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"
];

var pingHue = function(ping_time) {
    var good_value = 100;
    var bad_value = 300;
    var max_hue = 90;
    var inverted_hue = Math.min(max_hue * (ping_time - good_value) / (bad_value - good_value), max_hue);
    return max_hue - inverted_hue;
};

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log("ready");
    var start_time = Date.now;
});

bot.on("message", function(message){
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "ping":
            message.channel.send("Pong!").catch((error) => {
                console.error(error);
            });
            break;
        case "stats":
        case "statistics":
        var the_ping = Math.round(bot.ping) + "ms";
        var now_time = Date.now();
        var up_time = new Date(now_time - start_time);
        var up_time_string = up_time.getUTCHours() + "h " + up_time.getUTCMinutes() + "m " + up_time.getUTCSeconds() + "s";
            var embed = new Discord.RichEmbed()
                .addField("Ping", the_ping, true)
                .addField("Uptime", up_time_string, true)
                .setColor(color.hex4hue(pingHue(bot.ping)))
                .setFooter("ReactionRestriction", bot.user.avatarURL)
                .setTimestamp()
            message.channel.sendEmbed(embed);
            break;
        default:
            message.channel.sendMessage("Bad Command :(");
    }
});

bot.on("messageReactionAdd", (reaction, user) => {
    let message = reaction.message, 
        reactions = message.reactions,
        numReactions = reactions.size;
    console.log(reaction);
    if (numReactions > LIMIT) {
        reaction.remove(user);
    }
    if (ILLEGAL.includes(reaction.emoji.name)) {
        reaction.remove(user);
    }
});

bot.login(TOKEN);
