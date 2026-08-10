require("dotenv").config();

const { startBirthdaySystem } = require("./systems/birthday");
const { startPromotionLogger } = require("./systems/promotionLogger");

const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    Events
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ===============================
// SGH ROLE CONNECTION SYSTEM
// ===============================

// Corporate Team

const CORPORATE_ROLE = "1521852860655075459";

const CORPORATE_CONNECTION_ROLES = [
    "1514605444528738384", // Community Relations
    "1489901563613937826", // Human Resources
    "1515797638610681886"  // Clinical Operations
];

// Community Relations

const COMMUNITY_ROLE = "1514605444528738384";

const COMMUNITY_CONNECTION_ROLES = [
    "1507418643338887338",
    "1515439344473608422",
    "1521852082242457771",
    "1515439212021809344",
    "1516153582116667614"
];

// Department Connections

const DEPARTMENT_CONNECTIONS = {

    // Medical

    "1511366643446583406": [
        "1501986018927050843",
        "1501987639794995300",
        "1499767542447734824",
        "1501991981012750336",
        "1513187424107364507",
        "1513187729490448515"
    ],

    // Nursing

    "1511366831867170987": [
        "1501986276700848149",
        "1501988149226639433",
        "1501988760907415652",
        "1501992111606857911",
        "1513187565035847790",
        "1513187792904130690"
    ],

    // Paramedicine

    "1511366907884736634": [
        "1501986584113840238",
        "1501988621723373718",
        "1501991806412394597",
        "1501992265722364085",
        "1513187686700154980",
        "1513187918532055070"
    ],

    // Surgical

    "1511366736782299176": [
        "1501986440832094228",
        "1501988291170275449",
        "1501991609711984741",
        "1501992385284935700",
        "1513187633210069102",
        "1513187853260292357"
    ]

};

// ===============================
// ROLE AUTOMATION
// ===============================

client.on("guildMemberUpdate", async (oldMember, newMember) => {

    try {

        // Community Relations

        const getsCommunity = COMMUNITY_CONNECTION_ROLES.some(role =>
            newMember.roles.cache.has(role)
        );

        if (
            getsCommunity &&
            !newMember.roles.cache.has(COMMUNITY_ROLE)
        ) {

            await newMember.roles.add(COMMUNITY_ROLE);

            console.log(
                `Added Community Relations to ${newMember.user.tag}`
            );

        }

        // Department Connections

        for (const departmentRole in DEPARTMENT_CONNECTIONS) {

            const yearRoles = DEPARTMENT_CONNECTIONS[departmentRole];

            const getsDepartment = yearRoles.some(role =>
                newMember.roles.cache.has(role)
            );

            if (
                getsDepartment &&
                !newMember.roles.cache.has(departmentRole)
            ) {

                await newMember.roles.add(departmentRole);

                console.log(
                    `Added department role to ${newMember.user.tag}`
                );

            }

        }

        // Corporate Connections

        const getsCorporate = CORPORATE_CONNECTION_ROLES.some(role =>
            newMember.roles.cache.has(role)
        );

        if (
            getsCorporate &&
            !newMember.roles.cache.has(CORPORATE_ROLE)
        ) {

            await newMember.roles.add(CORPORATE_ROLE);

            console.log(
                `Added Corporate Team to ${newMember.user.tag}`
            );

        }

    } catch (error) {

        console.error(
            `Role automation error for ${newMember.user.tag}:`,
            error
        );

    }

});

// ===============================
// WELCOME MESSAGE
// ===============================

client.on(Events.GuildMemberAdd, async (member) => {

    const channel = member.guild.channels.cache.get(
        "1491820040297775184"
    );

    if (!channel) {

        console.log("Welcome channel was not found.");

        return;

    }

    const embed = new EmbedBuilder()

        .setColor("#2F80ED")

        .setTitle(
            "<:Seattle:1523995021253148693> | Welcome"
        )

        .setDescription(
`Hello, ${member}

Welcome to **Seattle Grace Hospital**. We are a professional, fun, and realistic roleplay server based on the game **Maple Hospital** inside Roblox.

If you don't play Roblox or Maple Hospital, you're still more than welcome to hang out with us!

## 📌 Important Channels

**✅ Verification**
<#1491821794045329538>

Type **/verify**, choose **Bloxlink**, and follow the instructions.

**📢 Announcements**
<#1490045452513579008>

All important announcements and updates are posted here.

**🕒 Sessions**
<#1489911067709673562>

Find session polls and server opening notifications here.

**💬 General Chat**
<#1489711285640761406>

Chat with the community!

**📄 Applications**
<#1489891020249497740>

Apply for Human Resources, Administrator, Community Relations, Director of Department, or Clinical Operations.

━━━━━━━━━━━━━━━━━━

❓ Need help?

Open a ticket in <#1489904772470276126> if you have any questions.

We hope you enjoy your stay at **Seattle Grace Hospital**! 🏥`
        )

        .setImage(
            "https://media.discordapp.net/attachments/1513089749710274631/1523807018270326905/content.png?ex=6a75a920&is=6a7457a0&hm=b107bc04cb8574d8209a6a23f623c771ded79664fa071b2cdecbf53231cfbb6f&=&format=webp&quality=lossless&width=1280&height=720"
        )

        .setThumbnail(
            member.user.displayAvatarURL({
                dynamic: true
            })
        )

        .setFooter({
            text: `Member #${member.guild.memberCount} • Welcome to Seattle Grace Hospital`
        })

        .setTimestamp();

    try {

        await channel.send({
            content: `${member}`,
            embeds: [embed]
        });

        console.log(
            `Sent welcome message for ${member.user.tag}`
        );

    } catch (error) {

        console.error(
            `Failed to send welcome message for ${member.user.tag}:`,
            error
        );

    }

});

// ===============================
// BOT ONLINE
// ===============================

client.once("ready", () => {

    console.log(`${client.user.tag} is online!`);

    // Birthday System
    startBirthdaySystem(client);

    // Promotion Logger
    startPromotionLogger(client);

});

client.login(process.env.TOKEN);
