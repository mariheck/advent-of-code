// Advent of code challenge 2015
// https://adventofcode.com/2015/day/4

const { calcMD5 } = require('./md5');

// QUESTION 1

// Santa needs help mining some AdventCoins (very similar to bitcoins) to use
// as gifts for all the economically forward-thinking little girls and boys.

// To do this, he needs to find MD5 hashes which, in hexadecimal, start with
// at least five zeroes. The input to the MD5 hash is some secret key (your
// puzzle input, given below) followed by a number in decimal. To mine
// AdventCoins, you must find Santa the lowest positive number (no leading
// zeroes: 1, 2, 3, ...) that produces such a hash.

// Your puzzle input is: bgvyzdsv.

// ANSWER: 254575
// HASH: 000004b30d481662b9cb0c105f6549b2

// ====================

// QUESTION 2

// Now find one that starts with six zeroes.

// ANSWER: 1038736
// HASH: 00000b1b64bf5eb55aad89986126953

const findMissingInput = (input, nbOfZeros) => {
    let answer = 0;
    let hash = '';
    let hashStart = '';

    for (let i = 0; i < nbOfZeros; i++) {
        hashStart += '0';
    }

    do {
        answer++;
        hash = calcMD5(input + answer);
    } while (hash.substring(0, nbOfZeros) !== hashStart);

    return { answer, hash };
};

// ====================
// MAIN
// ====================

const input = 'bgvyzdsv';

const question1 = findMissingInput(input, 5);
console.log(
    'Question 1 // answer : ',
    question1.answer,
    'hash :',
    question1.hash
);

const question2 = findMissingInput(input, 6);
console.log(
    'Question 2 // answer : ',
    question2.answer,
    'hash :',
    question2.hash
);
