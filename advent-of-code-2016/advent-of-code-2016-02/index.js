// Advent of code challenge 2016
// https://adventofcode.com/2016/day/2

const fs = require('fs');

const changeInputToArray = input => {
    return input.split('\n').map(line => line.split(''));
};

// QUESTION 1

// You arrive at Easter Bunny Headquarters under cover of darkness. However, you
// left in such a rush that you forgot to use the bathroom! Fancy office buildings
// like this one usually have keypad locks on their bathrooms, so you search the
// front desk for the code.

// "In order to improve security," the document you find says, "bathroom codes will
// no longer be written down. Instead, please memorize and follow the procedure
// below to access the bathrooms."

// The document goes on to explain that each button to be pressed can be found by
// starting on the previous button and moving to adjacent buttons on the keypad:
// U moves up, D moves down, L moves left, and R moves right. Each line of
// instructions corresponds to one button, starting at the previous button (or,
// for the first line, the "5" button); press whatever button you're on at the end
// of each line. If a move doesn't lead to a button, ignore it.

// You can't hold it much longer, so you decide to figure out the code as you walk
// to the bathroom. You picture a keypad like this:

// 1   2   3
// 4   5   6
// 7   8   9

// Your puzzle input is the instructions from the document you found at the front
// desk. What is the bathroom code?

// ANSWER: 99332

// =====================

// QUESTION 2

// You finally arrive at the bathroom (it's a several minute walk from the lobby so
// visitors can behold the many fancy conference rooms and water coolers on this
// floor) and go to punch in the code. Much to your bladder's dismay, the keypad is
// not at all like you imagined it. Instead, you are confronted with the result of
// hundreds of man-hours of bathroom-keypad-design meetings:

//     1
//   2 3 4
// 5 6 7 8 9
//   A B C
//     D

// You still start at "5" and stop when you're at an edge, but given the same
// instructions as above, the outcome is very different.

// Using the same instructions in your puzzle input, what is the correct bathroom
// code?

// ANSWER: DD483

const findCode = (inputArray, keypad, startingButton) => {
    // keypad[y][x]
    const currentButton = startingButton; // [y, x]
    let code = '';

    for (let i = 0; i < inputArray.length; i++) {
        let instructionLine = inputArray[i];

        for (let j = 0; j < instructionLine.length; j++) {
            switch (instructionLine[j]) {
                case 'R':
                    if (keypad[currentButton[0]][currentButton[1] + 1]) {
                        currentButton[1]++;
                    }
                    break;
                case 'L':
                    if (keypad[currentButton[0]][currentButton[1] - 1]) {
                        currentButton[1]--;
                    }
                    break;
                case 'U':
                    if (
                        keypad[currentButton[0] - 1] &&
                        keypad[currentButton[0] - 1][currentButton[1]]
                    ) {
                        currentButton[0]--;
                    }
                    break;
                case 'D':
                    if (
                        keypad[currentButton[0] + 1] &&
                        keypad[currentButton[0] + 1][currentButton[1]]
                    ) {
                        currentButton[0]++;
                    }
                    break;
                default:
                    break;
            }
        }

        code += keypad[currentButton[0]][currentButton[1]];
    }

    return code;
};

// ====================
// MAIN
// ====================

fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log("Couldn't read the input.");
    } else {
        const inputArray = changeInputToArray(data.toString());

        const firstKeypad = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ];

        const secondKeypad = [
            [null, null, '1', null, null],
            [null, '2', '3', '4', null],
            ['5', '6', '7', '8', '9'],
            [null, 'A', 'B', 'C', null],
            [null, null, 'D', null, null]
        ];
        console.log(secondKeypad);

        console.log(
            'Question 1 :',
            findCode(inputArray, firstKeypad, [1, 1]),
            '// Question 2 :',
            findCode(inputArray, secondKeypad, [2, 0])
        );
    }
});
