// Advent of code challenge 2015
// https://adventofcode.com/2015/day/3

const fs = require('fs');

// How many houses receive at least one present?

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

// Main running

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
