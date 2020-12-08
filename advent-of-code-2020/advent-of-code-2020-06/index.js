// Advent of code challenge 2020
// https://adventofcode.com/2020/day/6

// ================
// QUESTION 1
// ================
// As your flight approaches the regional airport where you'll switch to a much
// larger plane, customs declaration forms are distributed to the passengers.
// ================
// The form asks a series of 26 yes-or-no questions marked a through z. All you
// need to do is identify the questions for which anyone in your group answers
// "yes". Since your group is just you, this doesn't take very long.
// ================
// However, the person sitting next to you seems to be experiencing a language
// barrier and asks if you can help. For each of the people in their group, you
// write down the questions for which they answer "yes", one per line. For example:
// ================
// abcx
// abcy
// abcz
// ================
// In this group, there are 6 questions to which anyone answered "yes": a, b, c,
// x, y, and z. (Duplicate answers to the same question don't count extra; each
// question counts at most once.)
// ================
// Another group asks for your help, then another, and eventually you've collected
// answers from every group on the plane (your puzzle input). Each group's answers
// are separated by a blank line, and within each group, each person's answers are
// on a single line.
// ================
// For each group, count the number of questions to which anyone answered "yes".
// What is the sum of those counts?
// ================
// ANSWER: 6885

// ================
// QUESTION 2
// ================
// As you finish the last group's customs declaration, you notice that you misread
// one word in the instructions:
// ================
// You don't need to identify the questions to which anyone answered "yes"; you
// need to identify the questions to which everyone answered "yes"!
// ================
// For each group, count the number of questions to which everyone answered "yes".
// What is the sum of those counts?
// ================
// ANSWER: 3550

const fs = require('fs');

// CONVERT INPUT
const changeInputToArray = input => {
    return input
        .split('\n\n')
        .map(group => group.split('\n').map(person => person.split('')));
};

// COUNT NUMBER OF "YES" FOR ONE GROUP
const countGroupYesAnswers = (groupInput, question) => {
    const mergedGroupInput = groupInput.flat();
    let groupAnswers = {};
    let numberOfYes = 0;

    if (question === 'Q1') {
        // QUESTION 1
        for (let i = 0; i < mergedGroupInput.length; i++) {
            if (!groupAnswers[mergedGroupInput[i]]) {
                groupAnswers[mergedGroupInput[i]] = true;
                numberOfYes++;
            }
        }
    } else if (question === 'Q2') {
        // QUESTION 2
        const people = groupInput.length;
        for (let i = 0; i < mergedGroupInput.length; i++) {
            if (!groupAnswers[mergedGroupInput[i]]) {
                groupAnswers[mergedGroupInput[i]] = 1;
            } else {
                groupAnswers[mergedGroupInput[i]]++;
            }
            if (groupAnswers[mergedGroupInput[i]] === people) numberOfYes++;
        }
    }

    return numberOfYes;
};

// SUM OF GROUPS' YES
const sumYesAnswers = (input, question) => {
    let sum = 0;

    for (let i = 0; i < input.length; i++) {
        sum += countGroupYesAnswers(input[i], question);
    }

    return sum;
};

// MAIN CALL
fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());

        console.log(
            'Question 1 :',
            sumYesAnswers(inputArray, 'Q1'),
            '// Question 2 :',
            sumYesAnswers(inputArray, 'Q2')
        );
    }
});
