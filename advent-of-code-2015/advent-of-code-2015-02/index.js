// Advent of code challenge 2015
// https://adventofcode.com/2015/day/2

const fs = require('fs');

// Input convertion

const convertInput = input => {
    return input
        .split('\n')
        .map(present => present.split('x').map(dimension => Number(dimension)));
};

// Question 1 - How many total square feet of wrapping paper
// should the elves order?

const calculatePaperSize = input => {
    const inputArray = convertInput(input);
    let total = 0;

    inputArray.forEach(presentDimensions => {
        const area1 = presentDimensions[0] * presentDimensions[1];
        const area2 = presentDimensions[1] * presentDimensions[2];
        const area3 = presentDimensions[2] * presentDimensions[0];

        const smallestArea = Math.min(area1, area2, area3);

        total += 2 * (area1 + area2 + area3) + smallestArea;
    });

    return total;
};

// Question 2 - How many total feet of ribbon should they order?

const calculateRibbonLength = input => {
    const inputArray = convertInput(input);
    let total = 0;

    inputArray.forEach(presentDimensions => {
        const perim1 = 2 * (presentDimensions[0] + presentDimensions[1]);
        const perim2 = 2 * (presentDimensions[1] + presentDimensions[2]);
        const perim3 = 2 * (presentDimensions[2] + presentDimensions[0]);

        const bowLength =
            presentDimensions[0] * presentDimensions[1] * presentDimensions[2];

        total += Math.min(perim1, perim2, perim3) + bowLength;
    });

    return total;
};

// Main running

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const totalPaperSize = calculatePaperSize(data.toString());
        const totalRibbonLength = calculateRibbonLength(data.toString());

        console.log(
            'Question 1 :',
            totalPaperSize,
            '// Question 2 :',
            totalRibbonLength
        );
    }
});
