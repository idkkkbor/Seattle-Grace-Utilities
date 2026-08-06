require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});


// ===============================
// SGH ROLE CONNECTION SYSTEM
// ===============================


// Corporate Team
const CORPORATE_ROLE = "1521852860655075459";


// Roles that receive Corporate
const CORPORATE_CONNECTION_ROLES = [
    "1514605444528738384", // Community Relations
    "1489901563613937826", // Human Resources
    "1515797638610681886"  // Clinical Operations
];


// Roles that receive Community Relations
const COMMUNITY_ROLE = "1514605444528738384";

const COMMUNITY_CONNECTION_ROLES = [
    "1507418643338887338",
    "1515439344473608422",
    "1521852082242457771",
    "1515439212021809344",
    "1516153582116667614"
];


// Department Year Roles

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


    // Community Relations Connections

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

});


// ===============================
// BOT ONLINE
// ===============================

client.once("ready", () => {
    console.log(`${client.user.tag} is online!`);
});


client.login(process.env.TOKEN);

client.on("guildMemberUpdate", async (oldMember, newMember) => {});