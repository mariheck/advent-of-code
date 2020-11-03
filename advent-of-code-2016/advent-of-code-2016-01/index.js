// Advent of code challenge 2016
// https://adventofcode.com/2016/day/1

const fs = require('fs');

// QUESTION 1

// You're airdropped near Easter Bunny Headquarters in a city somewhere.
// "Near", unfortunately, is as close as you can get - the instructions on
// the Easter Bunny Recruiting Document the Elves intercepted start here, and
// nobody had time to work them out further.

// The Document indicates that you should start at the given coordinates (where
// you just landed) and face North. Then, follow the provided sequence:
// either turn left (L) or right (R) 90 degrees, then walk forward the given
// number of blocks, ending at a new intersection.

// There's no time to follow such ridiculous instructions on foot, though, so
// you take a moment and work out the destination. Given that you can only walk
// on the street grid of the city, how far is the shortest path to the destination?

// How many blocks away is Easter Bunny HQ?

// ANSWER: 231

const calculateNumberOfBlocks = inputArray => {
    const position = [0, 0]; // [x, y] = [0, 0] being the starting point
    let direction = 0; // 0: North, 1: East, 2: South, 3: West

    inputArray.forEach(instructionLine => {
        // Calculate the new direction
        const turningSide = instructionLine.substring(0, 1);

        switch (turningSide) {
            case 'R':
                direction++;
                if (direction > 3) direction = 0;
                break;
            case 'L':
                direction--;
                if (direction < 0) direction = 3;
                break;
            default:
                break;
        }

        // Calculate the new position
        const distance = Number(instructionLine.substring(1));

        switch (direction) {
            // 0: North, 1: East, 2: South, 3: West
            // position = [x, y]
            case 0:
                position[1] += distance;
                break;
            case 1:
                position[0] += distance;
                break;
            case 2:
                position[1] -= distance;
                break;
            case 3:
                position[0] -= distance;
                break;
            default:
                break;
        }
    });

    return Math.abs(position[0]) + Math.abs(position[1]);
};

// QUESTION 2

// Then, you notice the instructions continue on the back of the Recruiting
// Document. Easter Bunny HQ is actually at the first location you visit twice.

// For example, if your instructions are R8, R4, R4, R8, the first location you
// visit twice is 4 blocks away, due East.

// How many blocks away is the first location you visit twice?

// ANSWER: 147

const calculateHqBlocksDistance = inputArray => {
    const position = [0, 0]; // [x, y] = [0, 0] being the starting point
    let direction = 0; // 0: North, 1: East, 2: South, 3: West
    const visitedPlaces = [[0, 0]];
    let HqPosition = [];

    inputArray.forEach(instructionLine => {
        // Calculate the new direction
        const turningSide = instructionLine.substring(0, 1);

        switch (turningSide) {
            case 'R':
                direction++;
                if (direction > 3) direction = 0;
                break;
            case 'L':
                direction--;
                if (direction < 0) direction = 3;
                break;
            default:
                break;
        }

        // Calculate the new position
        const distance = Number(instructionLine.substring(1));

        switch (direction) {
            // 0: North, 1: East, 2: South, 3: West
            // position = [x, y]
            case 0:
                for (let i = 1; i <= distance; i++) {
                    for (let j = 0; j < visitedPlaces.length; j++) {
                        if (
                            visitedPlaces[j][0] === position[0] &&
                            visitedPlaces[j][1] === position[1] + i &&
                            !HqPosition.length
                        ) {
                            HqPosition = visitedPlaces[j];
                        }
                    }
                    visitedPlaces.push([position[0], position[1] + i]);
                }
                position[1] += distance;
                break;
            case 1:
                for (let i = 1; i <= distance; i++) {
                    for (let j = 0; j < visitedPlaces.length; j++) {
                        if (
                            visitedPlaces[j][0] === position[0] + i &&
                            visitedPlaces[j][1] === position[1] &&
                            !HqPosition.length
                        ) {
                            HqPosition = visitedPlaces[j];
                        }
                    }
                    visitedPlaces.push([position[0] + i, position[1]]);
                }
                position[0] += distance;
                break;
            case 2:
                for (let i = 1; i <= distance; i++) {
                    for (let j = 0; j < visitedPlaces.length; j++) {
                        if (
                            visitedPlaces[j][0] === position[0] &&
                            visitedPlaces[j][1] === position[1] - i &&
                            !HqPosition.length
                        ) {
                            HqPosition = visitedPlaces[j];
                        }
                    }
                    visitedPlaces.push([position[0], position[1] - i]);
                }
                position[1] -= distance;
                break;
            case 3:
                for (let i = 1; i <= distance; i++) {
                    for (let j = 0; j < visitedPlaces.length; j++) {
                        if (
                            visitedPlaces[j][0] === position[0] - i &&
                            visitedPlaces[j][1] === position[1] &&
                            !HqPosition.length
                        ) {
                            HqPosition = visitedPlaces[j];
                        }
                    }
                    visitedPlaces.push([position[0] - i, position[1]]);
                }
                position[0] -= distance;
                break;
            default:
                break;
        }
    });

    return Math.abs(HqPosition[0]) + Math.abs(HqPosition[1]);
};

// ====================
// MAIN
// ====================

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = data.toString().split(', ');

        console.log(
            'Question 1 :',
            calculateNumberOfBlocks(inputArray),
            '// Question 2 :',
            calculateHqBlocksDistance(inputArray)
        );
    }
});
