const blocksNo = 9;
const pieces = blocksNo;

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