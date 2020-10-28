// Advent of code challenge 2015
// https://adventofcode.com/2015/day/1

const fs = require('fs');

// QUESTION 1

// Santa is trying to deliver presents in a large apartment building,
// but he can't find the right floor - the directions he got are a little
// confusing. He starts on the ground floor (floor 0) and then follows the
// instructions one character at a time.

// An opening parenthesis, (, means he should go up one floor, and a closing
// parenthesis, ), means he should go down one floor.

// The apartment building is very tall, and the basement is very deep; he will
// never find the top or bottom floors.

// To what floor do the instructions take Santa?

// ANSWER : 232

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

// QUESTION 2

// Now, given the same instructions, find the position of the first character
// that causes him to enter the basement (floor -1). The first character in the
// instructions has position 1, the second character has position 2, and so on.

// What is the position of the character that causes Santa to first enter the
// basement? (floor -1)

// ANSWER : 1783

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

// ====================
// MAIN
// ====================

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
