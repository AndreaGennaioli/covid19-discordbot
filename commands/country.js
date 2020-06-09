const Discord = require('discord.js');

const NovelCovid = require('novelcovid');

module.exports = {
    name: "country",

    async run (bot, message, args, t) {
        const nothing = new Discord.MessageEmbed()
            .setTitle('No args')
			.setColor('#900E16');

        const corona = await NovelCovid.countries({ country: args.slice(1, args.length).join(" ")});

        console.log(corona);
		
		const noCountry = new Discord.MessageEmbed()
            .setTitle('Not A Valid Country')
			.setColor('#900E16');
		
        if(!args[1]) return message.channel.send(nothing);
		if(!corona) return message.channel.send(noCountry)
	
        const embed = new Discord.MessageEmbed()
            .setTitle(`${corona.country}`)
            .setColor('#900E16')
            .setDescription(`Info on Covid-19 in ${corona.country}`)
            .setThumbnail(corona.countryInfo.flag)
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