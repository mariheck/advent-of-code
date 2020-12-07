// Advent of code challenge 2020
// https://adventofcode.com/2020/day/5

// ================
// QUESTION 1
// ================
// You board your plane only to discover a new problem: you dropped your boarding
// pass! You aren't sure which seat is yours, and all of the flight attendants are
// busy with the flood of people that suddenly made it through passport control.
// ================
// You write a quick program to use your phone's camera to scan all of the nearby
// boarding passes (your puzzle input); perhaps you can find your seat through
// process of elimination.
// ================
// Instead of zones or groups, this airline uses binary space partitioning to seat
// people. A seat might be specified like FBFBBFFRLR, where F means "front", B means
// "back", L means "left", and R means "right".
// ================
// The first 7 characters will either be F or B; these specify exactly one of the
// 128 rows on the plane (numbered 0 through 127). Each letter tells you which half
// of a region the given seat is in. Start with the whole list of rows; the first
// letter indicates whether the seat is in the front (0 through 63) or the back
// (64 through 127). The next letter indicates which half of that region the seat
// is in, and so on until you're left with exactly one row.
// ================
// The last three characters will be either L or R; these specify exactly one of
// the 8 columns of seats on the plane (numbered 0 through 7). The same process as
// above proceeds again, this time with only three steps. L means to keep the lower
// half, while R means to keep the upper half.
// ================
// Every seat also has a unique seat ID: multiply the row by 8, then add the column.
// In this example, the seat has ID 44 * 8 + 5 = 357.
// ================
// As a sanity check, look through your list of boarding passes. What is the highest
// seat ID on a boarding pass?
// ================
// ANSWER: { row: 124, column: 6, seatId: 998 }

// ================
// QUESTION 2
// ================
// Ding! The "fasten seat belt" signs have turned on. Time to find your seat.
// ================
// It's a completely full flight, so your seat should be the only missing boarding
// pass in your list. However, there's a catch: some of the seats at the very front
// and back of the plane don't exist on this aircraft, so they'll be missing from
// your list as well.
// ================
// Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1
// from yours will be in your list.
// ================
// What is the ID of your seat?
// ================
// ANSWER: { row: 84, column: 4, seatId: 676 }

const fs = require('fs');

// CONVERT INPUT
const changeInputToArray = input => {
    return input.split('\n').map(boardingPass => boardingPass.split(''));
};

// READ INSTRUCTION
const readInstruction = (instructions, sits) => {
    if (instructions.length === 1) {
        if (instructions[0] === 'F' || instructions[0] === 'L') {
            return sits[0];
        } else if (instructions[0] === 'B' || instructions[0] === 'R') {
            return sits[1];
        }
    }

    if (instructions[0] === 'F' || instructions[0] === 'L') {
        return readInstruction(instructions.slice(1), [
            sits[0],
            sits[0] + Math.floor((sits[1] - sits[0]) / 2)
        ]);
    } else if (instructions[0] === 'B' || instructions[0] === 'R') {
        return readInstruction(instructions.slice(1), [
            sits[0] + Math.ceil((sits[1] - sits[0]) / 2),
            sits[1]
        ]);
    }
};

// READ A BOARDING PASS
const readBoardingPass = input => {
    let boardingPass = {
        row: readInstruction(input.slice(0, 7), [0, 127]),
        column: readInstruction(input.slice(7), [0, 7])
    };

    boardingPass.seatId = boardingPass.row * 8 + boardingPass.column;

    return boardingPass;
};

// SEARCH HIGHEST SEAT ID
const searchHighestSeatId = input => {
    let highestSeatId = {
        seatId: 0
    };

    for (let i = 0; i < input.length; i++) {
        let boardingPass = readBoardingPass(input[i]);
        if (boardingPass.seatId > highestSeatId.seatId)
            highestSeatId = boardingPass;
    }

    return highestSeatId;
};

// SEARCH FREE SEAT
const searchFreeSeat = input => {
    let idList = [];
    let maxId = 127 * 8 + 7;

    for (let i = 0; i < input.length; i++) {
        let boardingPass = readBoardingPass(input[i]);
        idList.push(boardingPass.seatId);
    }

    for (let i = 1; i < maxId; i++) {
        if (
            !idList.includes(i) &&
            idList.includes(i - 1) &&
            idList.includes(i + 1)
        ) {
            return { row: (i - (i % 8)) / 8, column: i % 8, seatId: i };
        }
    }
};

// MAIN CALL
fs.readFile('./input.txt', (err, data) => {
    if (err) {
        console.log(`
        Couldn't read the input.
        `);
    } else {
        const inputArray = changeInputToArray(data.toString());

        console.log(
            'Question 1 :',
            searchHighestSeatId(inputArray),
            '// Question 2 :',
            searchFreeSeat(inputArray)
        );
    }
});
