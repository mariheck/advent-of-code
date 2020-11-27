// Advent of code challenge 2017
// https://adventofcode.com/2017/day/2

const fs = require('fs');

const changeInputToArray = input => {
    return input
        .split('\n')
        .map(row => row.split('\t').map(number => Number(number)));
};

const sortRow = row => {
    for (let i = 1; i < row.length; i++) {
        if (row[i] < row[0]) {
            row.unshift(row.splice(i, 1)[0]);
        } else {
            if (row[i] < row[i - 1]) {
                for (let j = 1; j < i; j++) {
                    if (row[i] < row[j] && row[i] >= row[j - 1]) {
                        row.splice(j, 0, row.splice(i, 1)[0]);
                    }
                }
            }
        }
    }
};

const sortArrayRows = array => {
    for (let i = 0; i < array.length; i++) {
        sortRow(array[i]);
    }
};

// QUESTION 1

// As you walk through the door, a glowing humanoid shape yells in your
// direction. "You there! Your state appears to be idle. Come help us
// repair the corruption in this spreadsheet - if we take another millisecond,
// we'll have to display an hourglass cursor!"

// The spreadsheet consists of rows of apparently-random numbers. To make sure
// the recovery process is on the right track, they need you to calculate the
// spreadsheet's checksum. For each row, determine the difference between the
// largest value and the smallest value; the checksum is the sum of all of these
// differences.

// What is the checksum for the spreadsheet in your puzzle input?

// ANSWER: 34581

const findLargestDiff = row => {
    return row[row.length - 1] - row[0];
};

const calculateChecksum = inputArray => {
    let checksum = 0;
    for (let i = 0; i < inputArray.length; i++) {
        checksum += findLargestDiff(inputArray[i]);
    }
    return checksum;
};

// QUESTION 2

// "Great work; looks like we're on the right track after all. Here's a star for
// your effort." However, the program seems a little worried. Can programs be worried?

// "Based on what we're seeing, it looks like all the User wanted is some information
// about the evenly divisible values in the spreadsheet. Unfortunately, none of us are
// equipped for that kind of calculation - most of us specialize in bitwise operations."

// It sounds like the goal is to find the only two numbers in each row where one evenly
// divides the other - that is, where the result of the division operation is a whole
// number. They would like you to find those numbers on each line, divide them, and add
// up each line's result.

// What is the sum of each row's result in your puzzle input?

// ANSWER: 214

const findDivisionResult = row => {
    for (let i = 0; i < row.length - 1; i++) {
        for (let j = i + 1; j < row.length; j++) {
            if (row[j] % row[i] === 0) {
                return row[j] / row[i];
            }
        }
    }
};

const calculateNewChecksum = inputArray => {
    let checksum = 0;
    for (let i = 0; i < inputArray.length; i++) {
        checksum += findDivisionResult(inputArray[i]);
    }
    return checksum;
};

// ====================
// MAIN
// ====================

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());
        sortArrayRows(inputArray);

        console.log(
            'Question 1 :',
            calculateChecksum(inputArray),
            '// Question 2 :',
            calculateNewChecksum(inputArray)
        );
    }
});
