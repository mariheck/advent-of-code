// Advent of code challenge 2020
// https://adventofcode.com/2020/day/4

// ================
// QUESTION 1
// ================
// You arrive at the airport only to realize that you grabbed your North Pole
// Credentials instead of your passport. While these documents are extremely similar,
// North Pole Credentials aren't issued by a country and therefore aren't actually
// valid documentation for travel in most of the world.
// ================
// It seems like you're not the only one having problems, though; a very long line
// has formed for the automatic passport scanners, and the delay could upset your
// travel itinerary.
// ================
// Due to some questionable network security, you realize you might be able to solve
// both of these problems at the same time.
// ================
// The automatic passport scanners are slow because they're having trouble detecting
// which passports have all required fields. The expected fields are as follows:
// ================
// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)
// ================
// Passport data is validated in batch files (your puzzle input). Each passport is
// represented as a sequence of key:value pairs separated by spaces or newlines.
// Passports are separated by blank lines.
// ================
// Count the number of valid passports - those that have all required fields. Treat
// cid as optional. In your batch file, how many passports are valid?
// ================
// ANSWER: 208

const fs = require('fs');

// CONVERT INPUT
const changeInputToArray = input => {
    return input.split('\n\n').map(passport => {
        const passportInfosArray = passport.split('\n').join(' ').split(' ');
        let passportInfos = {};

        for (let i = 0; i < passportInfosArray.length; i++) {
            let key = passportInfosArray[i].split(':')[0];
            let value = passportInfosArray[i].split(':')[1];
            passportInfos[key] = value;
        }

        return passportInfos;
    });
};

// CHECK PASSPORT
const checkPassport = passportInfos => {
    if (
        passportInfos.byr &&
        passportInfos.iyr &&
        passportInfos.eyr &&
        passportInfos.hgt &&
        passportInfos.hcl &&
        passportInfos.ecl &&
        passportInfos.pid
    ) {
        return true;
    } else {
        return false;
    }
};

// CHECK DATABASE
const checkDB = input => {
    let validPassports = 0;

    for (let i = 0; i < input.length; i++) {
        if (checkPassport(input[i])) validPassports++;
    }

    return validPassports;
};

// MAIN CALL
fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());

        console.log('Question 1 :', checkDB(inputArray));
    }
});
