// Advent of code challenge 2015
// https://adventofcode.com/2015/day/1

const fs = require('fs');

// First question - To what floor do the instructions take Santa?
const findFloor = input => {
    let currentFloor = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            currentFloor++;
        } else if (input[i] === ')') {
            currentFloor--;
        }
    }

    return currentFloor;
};

// Second question - Find the position of the first character that
// causes him to enter the basement (floor -1)
const findPosition = input => {
    let currentFloor = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '(') {
            currentFloor++;
        } else if (input[i] === ')') {
            currentFloor--;
        }

        if (currentFloor === -1) return i + 1;
    }
};

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const lastFloor = findFloor(data.toString());
        const firstCharacter = findPosition(data.toString());

        console.log(
            'Question 1 :',
            lastFloor,
            '// Question 2 :',
            firstCharacter
        );
    }
});
