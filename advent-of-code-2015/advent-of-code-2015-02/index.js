// jshint esversion: 6

// Link to the challenge
// https://adventofcode.com/2015/day/2

const fs = require('fs');

fs.readFile('./input.txt', (err, data) => {
  const input = data.toString();
  const inputArray = input.split('\n');
  inputArray.pop();
  let totalArea = 0;
  let totalLength = 0;

  for (let i = 0; i < inputArray.length; i++) {
      const dimArray = inputArray[i].split('x');

      const area1 = dimArray[0] * dimArray[1];
      const area2 = dimArray[1] * dimArray[2];
      const area3 = dimArray[2] * dimArray[0];

      const smallestArea = Math.min(area1, area2, area3);
      totalArea += (area1*2 + area2*2 + area3*2 + smallestArea);

      const perim1 = 2*dimArray[0] + 2*dimArray[1];
      const perim2 = 2*dimArray[1] + 2*dimArray[2];
      const perim3 = 2*dimArray[2] + 2*dimArray[0];

      const smallestPerim = Math.min(perim1, perim2, perim3);
      totalLength += (smallestPerim + (dimArray[0]*dimArray[1]*dimArray[2]));
  }

  console.log('Total area :', totalArea);
  console.log('Total length :', totalLength);
});
