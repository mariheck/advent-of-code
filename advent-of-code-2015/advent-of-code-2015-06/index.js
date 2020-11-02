// Advent of code challenge 2015
// https://adventofcode.com/2015/day/6

const fs = require('fs');

// QUESTION 1

// Because your neighbors keep defeating you in the holiday house decorating
// contest year after year, you've decided to deploy one million lights in a
// 1000x1000 grid.

// Furthermore, because you've been especially nice this year, Santa has mailed
// you instructions on how to display the ideal lighting configuration.

// Lights in your grid are numbered from 0 to 999 in each direction; the lights
// at each corner are at 0,0, 0,999, 999,999, and 999,0. The instructions include
// whether to turn on, turn off, or toggle various inclusive ranges given as
// coordinate pairs. Each coordinate pair represents opposite corners of a
// rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore refers
// to 9 lights in a 3x3 square. The lights all start turned off.

// To defeat your neighbors this year, all you have to do is set up your lights
// by doing the instructions Santa sent you in order.

// After following the instructions, how many lights are lit?

// ANSWER: 569999

// ====================

// QUESTION 2

// You just finish implementing your winning light pattern when you realize you
// mistranslated Santa's message from Ancient Nordic Elvish.

// The light grid you bought actually has individual brightness controls; each
// light can have a brightness of zero or more. The lights all start at zero.

// The phrase turn on actually means that you should increase the brightness of
// those lights by 1.

// The phrase turn off actually means that you should decrease the brightness of
// those lights by 1, to a minimum of zero.

// The phrase toggle actually means that you should increase the brightness of
// those lights by 2.

// What is the total brightness of all lights combined after following Santa's
// instructions?

// ANSWER: 17836115

const extractAction = instruction => {
    let action = '';

    if (instruction.includes('turn on')) {
        action = 'turn on';
    } else if (instruction.includes('turn off')) {
        action = 'turn off';
    } else if (instruction.includes('toggle')) {
        action = 'toggle';
    }

    return action;
};

const extractInstructions = instructionLine => {
    const instructions = {};

    instructions.action = extractAction(instructionLine);

    const rectangleCoordinates = instructionLine
        .substring(instructions.action.length + 1)
        .split(' through ')
        .map(angleCoordinates =>
            angleCoordinates.split(',').map(coordinate => Number(coordinate))
        );

    instructions.start = rectangleCoordinates[0];
    instructions.end = rectangleCoordinates[1];

    return instructions;
};

const calculateLitLights = input => {
    const inputArray = input.split('\n');

    // Initialize grids
    const grid = [];
    for (let y = 0; y < 1000; y++) {
        grid.push([]);
        for (let x = 0; x < 1000; x++) {
            grid[y].push({ lit: false, brightness: 0 });
        }
    }

    // Apply instructions
    inputArray.forEach(instructionLine => {
        const instructions = extractInstructions(instructionLine);

        for (let y = instructions.start[1]; y <= instructions.end[1]; y++) {
            for (let x = instructions.start[0]; x <= instructions.end[0]; x++) {
                switch (instructions.action) {
                    case 'turn on':
                        grid[y][x].lit = true;
                        grid[y][x].brightness += 1;
                        break;
                    case 'turn off':
                        grid[y][x].lit = false;
                        grid[y][x].brightness -= 1;
                        if (grid[y][x].brightness < 0)
                            grid[y][x].brightness = 0;
                        break;
                    case 'toggle':
                        grid[y][x].lit = !grid[y][x].lit;
                        grid[y][x].brightness += 2;
                        break;
                    default:
                        break;
                }
            }
        }
    });

    // Calculate lit lights
    let litLights = 0;
    let brightness = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x].lit) litLights++;
            brightness += grid[y][x].brightness;
        }
    }

    return { litLights, brightness };
};

// ====================
// MAIN
// ====================

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const answers = calculateLitLights(data.toString());
        console.log(
            'Question 1 :',
            answers.litLights,
            '// Question 2 :',
            answers.brightness
        );
    }
});
