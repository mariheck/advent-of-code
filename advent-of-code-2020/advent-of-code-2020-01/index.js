// Advent of code challenge 2020
// https://adventofcode.com/2020/day/1

// ================
// QUESTION 1
// ================
// Before you leave, the Elves in accounting just need you to fix your expense
// report (your puzzle input); apparently, something isn't quite adding up.
// ================
// Specifically, they need you to find the two entries that sum to 2020 and then
// multiply those two numbers together.
// ================
// Find the two entries that sum to 2020; what do you get if you multiply them
// together?
// ================
// ANSWER: 82 * 1938 = 158916

// ================
// QUESTION 2
// ================
// The Elves in accounting are thankful for your help; one of them even offers you
// a starfish coin they had left over from a past vacation. They offer you a second
// one if you can find three numbers in your expense report that meet the same
// criteria.
// ================
// In your expense report, what is the product of the three entries that sum to
// 2020?
// ================
// ANSWER: 341 * 372 * 1307 = 165795564

const fs = require('fs');

// CONVERT INPUT
const changeInputToArray = input => {
    return input.split('\n').map(value => Number(value));
};

// SORT INPUT
const mergeSort = array => {
    if (array.length === 1) return array;

    const leftPart = array.slice(0, Math.floor(array.length / 2));
    const rightPart = array.slice(Math.floor(array.length / 2));

    return merge(mergeSort(leftPart), mergeSort(rightPart));
};

const merge = (leftPart, rightPart) => {
    const mergedArray = [];

    while (leftPart.length || rightPart.length) {
        if (!rightPart.length || leftPart[0] <= rightPart[0]) {
            mergedArray.push(leftPart.splice(0, 1)[0]);
        } else {
            mergedArray.push(rightPart.splice(0, 1)[0]);
        }
    }

    return mergedArray;
};

// FIND PAIR THAT SUM THE REQUESTED VALUE
const findPair = (array, sum) => {
    let firstValueIndex = 0;
    let secondValueIndex = array.length - 1;

    while (
        array[firstValueIndex] + array[secondValueIndex] !== sum &&
        firstValueIndex < secondValueIndex
    ) {
        if (array[firstValueIndex] + array[secondValueIndex] > sum) {
            secondValueIndex--;
        } else if (array[firstValueIndex] + array[secondValueIndex] < sum) {
            firstValueIndex++;
        }
    }

    if (firstValueIndex >= secondValueIndex) {
        return false;
    }

    return [array[firstValueIndex], array[secondValueIndex]];
};

// FIND TRIPLET THAT SUM THE REQUESTED VALUE
const findTriplet = (array, sum) => {
    let firstValueIndex = 0;
    let pair = findPair(
        array.slice(firstValueIndex + 1),
        sum - array[firstValueIndex]
    );

    while (!pair) {
        firstValueIndex++;
        pair = findPair(
            array.slice(firstValueIndex + 1),
            sum - array[firstValueIndex]
        );
    }

    return [array[firstValueIndex], ...pair];
};

// DISPLAY RESULT
const displayResult = (type, input) => {
    let result = {};

    if (type === 'pair') {
        const pair = findPair(input, 2020);
        result.firstValue = pair[0];
        result.secondValue = pair[1];
        result.product = pair[0] * pair[1];
    } else if (type === 'triplet') {
        const triplet = findTriplet(input, 2020);
        result.firstValue = triplet[0];
        result.secondValue = triplet[1];
        result.thirdValue = triplet[2];
        result.product = triplet[0] * triplet[1] * triplet[2];
    }

    return result;
};

// MAIN CALL
fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());
        const sortedArray = mergeSort(inputArray);

        console.log(
            'Question 1 :',
            displayResult('pair', sortedArray),
            '// Question 2 :',
            displayResult('triplet', sortedArray)
        );
    }
});
