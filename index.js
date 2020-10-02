const { TOKEN_DISCORD } = require('./commands/vars/TOKEN_DISCORD.js');
const { PREFIX } = require('./commands/vars/PREFIX.js');

const Discord = require('discord.js');
const bot = new Discord.Client();

console.log(TOKEN_DISCORD);

const { readdirSync } = require('fs');
const { join } = require('path');

bot.commands = new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}

bot.on('ready', () => {
    console.log('BOT IS ONLINE');

    bot.user.setActivity('.country', 'PLAYING');
})

bot.on('message', async message => {
    if (message.content.startsWith(PREFIX)) 
    {
        const args = message.content.substring(PREFIX.length).split(" ");
        if(!args[0]) return message.reply('Insert a command!')

        const command = args[0].toLowerCase();

        if(!bot.commands.has(command)) return;

        try {
            if(bot.commands.get(command)) bot.commands.get(command).run(bot, message, args, args[2]);
            else message.reply("Unknow command");
        } catch (error) {
            console.error(error);
        }
    }
})

bot.login(TOKEN_DISCORD);