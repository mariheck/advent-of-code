// Advent of code challenge 2020
// https://adventofcode.com/2020/day/3

// ================
// QUESTION 1
// ================
// With the toboggan login problems resolved, you set off toward the airport.
// While travel by toboggan might be easy, it's certainly not safe: there's very
// minimal steering and the area is covered in trees. You'll need to see which
// angles will take you near the fewest trees.
// ================
// Due to the local geology, trees in this area only grow on exact integer
// coordinates in a grid. You make a map (your puzzle input) of the open
// squares (.) and trees (#) you can see.
// ================
// These aren't the only trees, though; due to something you read about once
// involving arboreal genetics and biome stability, the same pattern repeats to
// the right many times.
// ================
// You start on the open square (.) in the top-left corner and need to reach the
// bottom (below the bottom-most row on your map).
// ================
// The toboggan can only follow a few specific slopes (you opted for a cheaper
// model that prefers rational numbers); start by counting all the trees you would
// encounter for the slope right 3, down 1:
// ================
// From your starting position at the top-left, check the position that is right 3
// and down 1. Then, check the position that is right 3 and down 1 from there, and
// so on until you go past the bottom of the map.
// ================
// Starting at the top-left corner of your map and following a slope of right 3
// and down 1, how many trees would you encounter?
// ================
// ANSWER: 284

// ================
// QUESTION 2
// ================
// Time to check the rest of the slopes - you need to minimize the probability of a
// sudden arboreal stop, after all.
// ================
// Determine the number of trees you would encounter if, for each of the following
// slopes, you start at the top-left corner and traverse the map all the way to the
// bottom:
// ================
// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
// ================
// What do you get if you multiply together the number of trees encountered on each
// of the listed slopes?
// ================
// ANSWER: {
//   slopeOptions: [
//     { right: 1, down: 1, encounteredTrees: 64 },
//     { right: 3, down: 1, encounteredTrees: 284 },
//     { right: 5, down: 1, encounteredTrees: 71 },
//     { right: 7, down: 1, encounteredTrees: 68 },
//     { right: 1, down: 2, encounteredTrees: 40 }
//   ],
//   answer: 3510149120
// }

const fs = require('fs');

// CONVERT INPUT
const changeInputToArray = input => {
    return input.split('\n').map(line => line.split(''));
};

// COUNT ENCOUNTERED TREES
const countTrees = (input, right, down) => {
    let encounteredTrees = 0;
    let x = 0;

    for (let y = down; y < input.length; y += down) {
        x += right;
        if (!input[y][x]) {
            x = x - input[y].length;
        }
        if (input[y][x] === '#') {
            encounteredTrees++;
        }
    }

    return encounteredTrees;
};

// CHECK EVERY SLOPES
const checkSlopes = input => {
    let slopes = {
        slopeOptions: [
            { right: 1, down: 1, encounteredTrees: 0 },
            { right: 3, down: 1, encounteredTrees: 0 },
            { right: 5, down: 1, encounteredTrees: 0 },
            { right: 7, down: 1, encounteredTrees: 0 },
            { right: 1, down: 2, encounteredTrees: 0 }
        ],
        answer: 1
    };

    for (let i = 0; i < slopes.slopeOptions.length; i++) {
        slopes.slopeOptions[i].encounteredTrees = countTrees(
            input,
            slopes.slopeOptions[i].right,
            slopes.slopeOptions[i].down
        );
        slopes.answer *= slopes.slopeOptions[i].encounteredTrees;
    }

    return slopes;
};

// MAIN CALL
fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());

        console.log(
            'Question 1 :',
            countTrees(inputArray, 3, 1),
            '// Question 2 :',
            checkSlopes(inputArray)
        );
    }
});
