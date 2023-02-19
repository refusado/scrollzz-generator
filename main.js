const fs = require('fs');

const level = 5;
const resultPath = `./level-${level}.css`;

const data = {
  0: { block: 4, image: "star" },
  1: { block: 8, image: "polygon" },
  2: { block: 9, image: "circle" },
  3: { block: 16, image: "cube" },
  4: { block: 16, image: "moon" },
  5: { block: 20, image: "triangle" }  
}
const blocksNo = data[level].block;
const image = data[level].image;

function randomNumber(min = 1, max = blocksNo, except = []) {
  let number, random;

  while (!number) {
    random = Math.random() * (max - min) + min;
    random = Math.round(random);

    if (!except.includes(random))
      number = random;
  }

  return number;
}

function randomSequence(index = 1, offset = blocksNo, length = blocksNo, sequence = []){
  for (let i = 0; i < length; i++) {
    const number = randomNumber(index, offset, sequence);
    sequence.push(number);
  }

  return sequence;
}

let firstPieces;
while (!firstPieces) {
  const sequence = randomSequence();

  let hasEquals = false;
  for (let i = 0; i < sequence.length; i++) {
    if (sequence[i] == i + 1) hasEquals = true;
  }

  if (!hasEquals) firstPieces = sequence;
}

const blocks = [];
for (let i = 0; i < blocksNo; i++) {
  const first = firstPieces[i];

  blocks.push(randomSequence(1, blocksNo, blocksNo - 1, [first]));
}

const piecesPositions = [];
for (let i = 0; i < blocksNo; i++) {
  const currPiece = [];
  const piece = i + 1;

  for (let j = 0; j < blocks.length; j++) {
    const position = blocks[j].indexOf(piece) + 1;
    currPiece.push(position);
  }

  piecesPositions.push(currPiece);
}

let fileContent = `/*
  Automatically generated file
  Generator: https://github.com/refusado/scrollzz-generator
*/ \n\n`;

piecesPositions.forEach((currPiece, pieceIndex) => {

  currPiece.forEach((position, positionIndex) => {
    fileContent += `#b${level}${positionIndex + 1} .tile:nth-child(${position})`;

    if (currPiece.length - 1 == positionIndex) {
      fileContent += ` {\n  background-image: var(--${image}-${pieceIndex + 1});\n}\n\n`;
    } else {
      fileContent += `,\n`;
    }
  });

});

fs.writeFile(resultPath, fileContent, function (err) {
  if (err) throw err;
});