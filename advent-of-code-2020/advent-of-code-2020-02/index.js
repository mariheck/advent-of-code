// Advent of code challenge 2020
// https://adventofcode.com/2020/day/2

// ================
// QUESTION 1
// ================
// Your flight departs in a few days from the coastal airport; the easiest way
// down to the coast from here is via toboggan.
// ================
// The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day.
// "Something's wrong with our computers; we can't log in!" You ask if you can
// take a look.
// ================
// Their password database seems to be a little corrupted: some of the passwords
// wouldn't have been allowed by the Official Toboggan Corporate Policy that was
// in effect when they were chosen.
// ================
// To try to debug the problem, they have created a list (your puzzle input) of
// passwords (according to the corrupted database) and the corporate policy when
// that password was set.
// ================
// Each line gives the password policy and then the password. The password policy
// indicates the lowest and highest number of times a given letter must appear for
// the password to be valid. For example, 1-3 a means that the password must contain
// a at least 1 time and at most 3 times.
// ================
// How many passwords are valid according to their policies?
// ================
// ANSWER: 660

// ================
// QUESTION 2
// ================
// While it appears you validated the passwords correctly, they don't seem to be what
// the Official Toboggan Corporate Authentication System is expecting.
// ================
// The shopkeeper suddenly realizes that he just accidentally explained the password
// policy rules from his old job at the sled rental place down the street! The Official
// Toboggan Corporate Policy actually works a little differently.
// ================
// Each policy actually describes two positions in the password, where 1 means the first
// character, 2 means the second character, and so on. (Be careful; Toboggan Corporate
// Policies have no concept of "index zero"!) Exactly one of these positions must
// contain the given letter. Other occurrences of the letter are irrelevant for
// the purposes of policy enforcement.
// ================
// How many passwords are valid according to the new interpretation of the policies?
// ================
// ANSWER:

const fs = require('fs');

// CONVERT INPUT
const changeInputToArray = input => {
    return input.split('\n').map(line => {
        const splitedLine = line.split(': ');
        const splitedPolicy = splitedLine[0].split(' ');
        return {
            policy: {
                first: Number(splitedPolicy[0].split('-')[0]),
                second: Number(splitedPolicy[0].split('-')[1]),
                letter: splitedPolicy[1]
            },
            password: splitedLine[1]
        };
    });
};

// CHECK A GIVEN PASSWORD
const checkPasswordQ1 = input => {
    const password = input.password.split('');
    let nb = 0;

    for (let i = 0; i < password.length; i++) {
        if (password[i] === input.policy.letter) nb++;
    }

    if (nb >= input.policy.first && nb <= input.policy.second) {
        return true;
    } else {
        return false;
    }
};

const checkPasswordQ2 = input => {
    const password = input.password.split('');
    const firstPosition = input.policy.first;
    const secondPosition = input.policy.second;
    const letter = input.policy.letter;

    if (
        (password[firstPosition - 1] === letter &&
            password[secondPosition - 1] !== letter) ||
        (password[secondPosition - 1] === letter &&
            password[firstPosition - 1] !== letter)
    ) {
        return true;
    } else {
        return false;
    }
};

// CHECK DATABASE
const checkDatabase = (input, question) => {
    let validPasswords = 0;
    if (question === 'q1') {
        for (let i = 0; i < input.length; i++) {
            if (checkPasswordQ1(input[i])) validPasswords++;
        }
    } else if (question === 'q2') {
        for (let i = 0; i < input.length; i++) {
            if (checkPasswordQ2(input[i])) validPasswords++;
        }
    }

    return validPasswords;
};

// MAIN CALL
fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());

        console.log(
            'Question 1 :',
            checkDatabase(inputArray, 'q1'),
            '// Question 2 :',
            checkDatabase(inputArray, 'q2')
        );
    }
});
