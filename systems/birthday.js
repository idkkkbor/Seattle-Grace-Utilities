const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/birthdays.json");

function getBirthdays() {

    if (!fs.existsSync(filePath)) {
        return {};
    }

    const data = fs.readFileSync(filePath, "utf8");

    return JSON.parse(data);
}

function saveBirthdays(birthdays) {

    fs.writeFileSync(
        filePath,
        JSON.stringify(birthdays, null, 4)
    );

}

function setBirthday(userId, month, day) {

    const birthdays = getBirthdays();

    birthdays[userId] = {
        month,
        day
    };

    saveBirthdays(birthdays);
}

function removeBirthday(userId) {

    const birthdays = getBirthdays();

    delete birthdays[userId];

    saveBirthdays(birthdays);
}

module.exports = {
    getBirthdays,
    saveBirthdays,
    setBirthday,
    removeBirthday
};
