const { SlashCommandBuilder } = require("discord.js");
const { setBirthday } = require("../systems/birthday");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setbirthday")
        .setDescription("Set your birthday.")
        .addStringOption(option =>
            option
                .setName("month")
                .setDescription("Your birth month, e.g. January")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("day")
                .setDescription("Your birth day, e.g. 15")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(31)
        ),

    async execute(interaction) {

        const month = interaction.options.getString("month");
        const day = interaction.options.getInteger("day");

        setBirthday(
            interaction.user.id,
            month,
            day
        );

        await interaction.reply({
            content: `🎂 Your birthday has been set to **${month} ${day}**.`,
            ephemeral: true
        });

    }
};
