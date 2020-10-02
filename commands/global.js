const Discord = require('discord.js');

const NovelCovid = require('novelcovid');

module.exports = {
    name: "global",

    async run (bot, message, args, t) {

        const corona = await NovelCovid.all();

        console.log(corona);

        const embed = new Discord.MessageEmbed()
            .setTitle(`Global`)
            .setColor('#900E16')
            .setDescription(`Info on Covid-19`)
            .setThumbnail('https://t3.ftcdn.net/jpg/03/05/96/10/240_F_305961049_jSajJ37lNv4RwnTZEXKpFfHlKGSqg8gF.jpg')
            .addField('Total Confirmed', corona.cases, true)
            .addField('Total Deaths', corona.deaths, true)
            .addField('Total Recovered', corona.recovered, true)
            .addField('Today\'s Cases', corona.todayCases, true)
            .addField('Today\'s Deaths', corona.todayDeaths, true)
            .addField('Today\'s Recovered', corona.todayRecovered, true)
            .addField('Total Active', corona.active, false)
            .addField('Critical Cases', corona.critical, false)
            .setFooter(`Covid-19 Bot - usig novelcovid API`, bot.user.displayAvatarURL())

        message.channel.send(embed)
    }
}