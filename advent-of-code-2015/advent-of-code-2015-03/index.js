// Advent of code challenge 2015
// https://adventofcode.com/2015/day/3

const fs = require('fs');

// QUESTION 1

// Santa is delivering presents to an infinite two-dimensional
// grid of houses.

// He begins by delivering a present to the house at his starting
// location, and then an elf at the North Pole calls him via radio
// and tells him where to move next. Moves are always exactly one
// house to the north (^), south (v), east (>), or west (<). After
// each move, he delivers another present to the house at his new
// location.

// However, the elf back at the north pole has had a little too
// much eggnog, and so his directions are a little off, and Santa
// ends up visiting some houses more than once. How many houses
// receive at least one present?

// ANSWER : 2081

// ====================

// QUESTION 2

// The next year, to speed up the process, Santa creates a robot version
// of himself, Robo-Santa, to deliver presents with him.

// Santa and Robo-Santa start at the same location (delivering two presents
// to the same starting house), then take turns moving based on
// instructions from the elf, who is eggnoggedly reading from the same
// script as the previous year.

// This year, how many houses receive at least one present?

// ANSWER : 2341

const calculateVisitedHousesNumber = (input, nbOfSantas) => {
    const visitedHouses = [[0, 0]];
    const currentHouses = [];
    for (let i = 0; i < nbOfSantas; i++) {
        currentHouses.push([0, 0]);
    }

    for (let i = 0; i < input.length; i++) {
        switch (input[i]) {
            case '>':
                currentHouses[i % nbOfSantas][0] += 1;
                break;
            case '<':
                currentHouses[i % nbOfSantas][0] -= 1;
                break;
            case '^':
                currentHouses[i % nbOfSantas][1] += 1;
                break;
            case 'v':
                currentHouses[i % nbOfSantas][1] -= 1;
                break;
            default:
                break;
        }

        let firstVisit = true;
        visitedHouses.forEach(house => {
            if (
                house[0] === currentHouses[i % nbOfSantas][0] &&
                house[1] === currentHouses[i % nbOfSantas][1]
            ) {
                firstVisit = false;
                return;
            }
        });

        if (firstVisit)
            visitedHouses.push([
                currentHouses[i % nbOfSantas][0],
                currentHouses[i % nbOfSantas][1]
            ]);
    }

    return visitedHouses.length;
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
            calculateVisitedHousesNumber(data.toString(), 1),
            '// Question 2 :',
            calculateVisitedHousesNumber(data.toString(), 2)
        );
    }
});
