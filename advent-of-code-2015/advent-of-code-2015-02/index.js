// Advent of code challenge 2015
// https://adventofcode.com/2015/day/2

const fs = require('fs');

// INPUT CONVERSION

const convertInput = input => {
    return input
        .split('\n')
        .map(present => present.split('x').map(dimension => Number(dimension)));
};

// QUESTION 1

// The elves are running low on wrapping paper, and so they need to submit
// an order for more. They have a list of the dimensions (length l, width w,
// and height h) of each present, and only want to order exactly as much as
// they need.

// Fortunately, every present is a box (a perfect right rectangular prism),
// which makes calculating the required wrapping paper for each gift a little
// easier: find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l.
// The elves also need a little extra paper for each present: the area of the
// smallest side.

// All numbers in the elves' list are in feet. How many total square feet of
// wrapping paper should they order?

// ANSWER : 1586300

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

// QUESTION 2

// The elves are also running low on ribbon. Ribbon is all the same width,
// so they only have to worry about the length they need to order, which they
// would again like to be exact.

// The ribbon required to wrap a present is the shortest distance around its
// sides, or the smallest perimeter of any one face. Each present also requires
// a bow made out of ribbon as well; the feet of ribbon required for the perfect
// bow is equal to the cubic feet of volume of the present. Don't ask how they
// tie the bow, though; they'll never tell.

// How many total feet of ribbon should they order?

// ANSWER : 3737498

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

// ====================
// MAIN
// ====================

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
