const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/birthdays.json");

function getBirthdays() {
    if (!fs.existsSync(filePath)) {
        return {};
    }

    return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveBirthdays(birthdays) {
    fs.writeFileSync(
        filePath,
        JSON.stringify(birthdays, null, 4)
    );
}

function startBirthdaySystem(client) {
    console.log("Birthday system started.");
}

module.exports = {
    getBirthdays,
    saveBirthdays,
    startBirthdaySystem
};
