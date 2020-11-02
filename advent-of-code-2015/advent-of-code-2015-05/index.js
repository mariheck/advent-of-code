// Advent of code challenge 2015
// https://adventofcode.com/2015/day/5

const fs = require('fs');

// QUESTION 1

// Santa needs help figuring out which strings in his text file are
// naughty or nice.

// A nice string is one with all of the following properties:

// - It contains at least three vowels (aeiou only), like aei, xazegov,
// or aeiouaeiouaeiou.
// - It contains at least one letter that appears twice in a row, like xx,
// abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
// - It does not contain the strings ab, cd, pq, or xy, even if they are
// part of one of the other requirements.

// How many strings are nice?

// ANSWER: 236

const firstCondition = string => {
    let vowels = 0;

    for (let i = 0; i < string.length; i++) {
        if ('aeiou'.includes(string[i])) vowels++;
    }

    if (vowels >= 3) {
        return true;
    } else {
        return false;
    }
};

const secondCondition = string => {
    for (let i = 0; i < string.length - 1; i++) {
        if (string[i] === string[i + 1]) return true;
    }

    return false;
};

const thirdCondition = string => {
    if (
        string.includes('ab') ||
        string.includes('cd') ||
        string.includes('pq') ||
        string.includes('xy')
    ) {
        return false;
    }

    return true;
};

const calculateNiceStringsNumber = input => {
    const inputArray = input.split('\n');
    let niceStringsNumber = 0;

    inputArray.forEach(string => {
        if (
            thirdCondition(string) &&
            secondCondition(string) &&
            firstCondition(string)
        )
            niceStringsNumber++;
    });

    return niceStringsNumber;
};

// QUESTION 2

// Realizing the error of his ways, Santa has switched to a better model
// of determining whether a string is naughty or nice. None of the old rules
// apply, as they are all clearly ridiculous.

// Now, a nice string is one with all of the following properties:

// - It contains a pair of any two letters that appears at least twice in the
// string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like
// aaa (aa, but it overlaps).
// - It contains at least one letter which repeats with exactly one letter between
// them, like xyx, abcdefeghi (efe), or even aaa.

// How many strings are nice under these new rules?

// ANSWER: 51

const fourthCondition = string => {
    for (let i = 0; i < string.length - 1; i++) {
        if (
            string.substring(0, i).includes(string.substring(i, i + 2)) ||
            string
                .substring(i + 2, string.length)
                .includes(string.substring(i, i + 2))
        )
            return true;
    }

    return false;
};

const fifthCondition = string => {
    for (let i = 0; i < string.length - 2; i++) {
        if (string[i] === string[i + 2]) return true;
    }

    return false;
};

const newCalculateNiceStringsNumber = input => {
    const inputArray = input.split('\n');
    let niceStringsNumber = 0;

    inputArray.forEach(string => {
        if (fourthCondition(string) && fifthCondition(string))
            niceStringsNumber++;
    });

    return niceStringsNumber;
};

// ====================
// MAIN
// ====================

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        console.log(
            'Question 1 :',
            calculateNiceStringsNumber(data.toString()),
            '// Question 2 :',
            newCalculateNiceStringsNumber(data.toString())
        );
    }
});
