const { SlashCommandBuilder } = require("discord.js");
const { removeBirthday } = require("../systems/birthday");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("removebirthday")
        .setDescription("Remove your saved birthday."),

    async execute(interaction) {

        removeBirthday(interaction.user.id);

        await interaction.reply({
            content: "🗑️ Your saved birthday has been removed.",
            ephemeral: true
        });

    }
};
