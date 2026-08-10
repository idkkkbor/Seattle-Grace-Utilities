require("dotenv").config();

const fs = require("fs");
const path = require("path");

const {
    REST,
    Routes
} = require("discord.js");

const CLIENT_ID = "1534852983873867827";

const commands = [];

const commandsPath = path.join(__dirname, "commands");

const commandFiles = fs.readdirSync(commandsPath)
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(
        path.join(commandsPath, file)
    );

    commands.push(command.data.toJSON());

    console.log(`Loading command: ${file}`);
}

const rest = new REST({ version: "10" })
    .setToken(process.env.TOKEN);

(async () => {

    try {

        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            {
                body: commands
            }
        );

        console.log("Successfully registered slash commands.");

    } catch (error) {

        console.error(error);

    }

})();
