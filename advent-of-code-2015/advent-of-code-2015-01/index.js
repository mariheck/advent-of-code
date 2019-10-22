// jshint esversion: 6

// Link to the challenge
// https://adventofcode.com/2015/day/1

const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {

  // Save the input
  const input = data.toString();

  // Init answers
  let floor = 0;
  let firstTime = true;
  let characPosition = 1;

  for (let i = 0; i < input.length; i++) {

    // Question 1 - Last floor
    if (input[i] === '(') {
      floor++;
    } else if (input[i] === ')') {
      floor--;
    }

    // Question 2 - First time in floor -1
    if (floor < 0 && firstTime === true) {
      firstTime = false;
      characPosition += i;
    }
  }

  console.log('Final floor :', floor);
  console.log('Character position :', characPosition);
});
