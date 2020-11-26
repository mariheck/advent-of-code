// Advent of code challenge 2017
// https://adventofcode.com/2017/day/1

const fs = require('fs');

const changeInputToArray = input => {
    return input.split('').map(value => Number(value));
};

// QUESTION 1

// You're standing in a room with "digitization quarantine" written in LEDs along
// one wall. The only door is locked, but it includes a small interface. "Restricted
// Area - Strictly No Digitized Users Allowed."

// It goes on to explain that you may only leave by solving a captcha to prove you're
// not a human. Apparently, you only get one millisecond to solve the captcha: too
// fast for a normal human, but it feels like hours to you.

// The captcha requires you to review a sequence of digits (your puzzle input) and
// find the sum of all digits that match the next digit in the list. The list is
// circular, so the digit after the last digit is the first digit in the list.

// What is the solution to your captcha?

// ANSWER: 1175

const findCaptcha = inputArray => {
    let sum = 0;

    for (let i = 0; i < inputArray.length - 1; i++) {
        if (inputArray[i] === inputArray[i + 1]) {
            sum += inputArray[i];
        }
    }

    if (inputArray[inputArray.length - 1] === inputArray[0]) {
        sum += inputArray[inputArray.length - 1];
    }

    return sum;
};

// QUESTION 2

// You notice a progress bar that jumps to 50% completion. Apparently, the door isn't
// yet satisfied, but it did emit a star as encouragement. The instructions change:

// Now, instead of considering the next digit, it wants you to consider the digit
// halfway around the circular list. That is, if your list contains 10 items, only
// include a digit in your sum if the digit 10/2 = 5 steps forward matches it.
// Fortunately, your list has an even number of elements.

// What is the solution to your new captcha?

// ANSWER: 1166

const findNewCaptcha = inputArray => {
    const stepsForward = inputArray.length / 2;
    let sum = 0;

    for (let i = 0; i < inputArray.length; i++) {
        let comparedElement;
        if (i < stepsForward) {
            comparedElement = inputArray[i + stepsForward];
        } else {
            comparedElement = inputArray[i - stepsForward];
        }
        if (inputArray[i] === comparedElement) sum += inputArray[i];
    }

    return sum;
};

// ====================
// MAIN
// ====================

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());

        console.log(
            'Question 1 :',
            findCaptcha(inputArray),
            '// Question 2 :',
            findNewCaptcha(inputArray)
        );
    }
});
