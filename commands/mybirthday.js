const { SlashCommandBuilder } = require("discord.js");
const { getBirthdays } = require("../systems/birthday");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mybirthday")
        .setDescription("View your saved birthday."),

    async execute(interaction) {

        const birthdays = getBirthdays();

        const birthday = birthdays[interaction.user.id];

        if (!birthday) {
            return interaction.reply({
                content: "You have not set your birthday yet.",
                ephemeral: true
            });
        }

        await interaction.reply({
            content: `Your birthday is **${birthday.month} ${birthday.day}**.`,
            ephemeral: true
        });
    }
};
