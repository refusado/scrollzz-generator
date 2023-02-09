const level = 0;

const data = {
  0: { block: 4, image: "star" },
  1: { block: 8, image: "polygon" },
  2: { block: 9, image: "circle" },
  3: { block: 16, image: "cube" },
  4: { block: 16, image: "moon" },
  5: { block: 20, image: "triangle" }  
}

const blocksNo = data[level].block;

function getRandom(min = 1, max = blocksNo) {
  const randomNumber = Math.random() * (max - min) + min;
  return Math.round(randomNumber).toString();
}

const firstPiece = []

for (let i = 1; i <= blocksNo; i++) {
  const rand = getRandom();
  
  if (firstPiece.includes(rand)) {
    i--;
  } else {
    firstPiece.push(rand);
  }
}

// GENERATING GRID

const grid    = [];
const firsts  = [];

let currColumn = 1;

for (let i = 1; i <= blocksNo; i++) {
  const column = [];

  for (let ii = 1; ii <= blocksNo; ii++) {
    let number = getRandom(2, blocksNo);
    

    if (currColumn == i && ii == firstPiece[i - 1]) {
      currColumn++;

      number = 1;
    }

    if (ii == 0) {
      if (firsts.includes(number)) {
        ii--;
      } else {
        firsts.push(number);
        column.push(number);
      }

    } else if (column.includes(number)) {

      ii--;
    } else {
      column.push(number);
    }
  }

  grid.push(column);
}

// COMPACTING GRID INTO A STRING

let compactGrid = "";

for (let i = 1; i <= grid.length; i++) {

  for (let ii = 1; ii <= grid.length; ii++) {
    const column = grid[ii - 1];
    const number = column[i - 1];

    compactGrid += number + " ";
  }
}

// GENERATING CSS CONTENT

let result = `/*
  Automatically generated file
  Generator: https://github.com/refusado/scrollzz-generator
*/\n
`;
let currentBlock = 1;
let currentPiece = 1;

const image = data[level].image;

listedGrid = compactGrid.split(' ');
listedGrid.map((number, index) => {

  if (index > 1 && index % blocksNo == 0) {
    result += `{\n  background-image: var(--${image}-${currentPiece});\n}\n\n`;

    currentPiece++;
  }

  if (index >= blocksNo * blocksNo) return;
  
  let lineEnd = ',\n';
  if (currentBlock == blocksNo) lineEnd = ' ';

  result += `#b${level}${currentBlock} .tile:nth-child(${number})${lineEnd}`;

  currentBlock++;
  if (currentBlock >= blocksNo + 1) currentBlock = 1;
});

const fs = require('fs');

fs.writeFile(`css/level/level-${level}.css`, result, function (err) {
  if (err) throw err;
});