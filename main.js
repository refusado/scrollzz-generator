const blocksNo = 9;

function getRandom(min = 1, max = blocksNo, except = []) {
  let number, random;

  while (!number) {
    random = Math.random() * (max - min) + min;
    random = Math.round(random);

    if (!except.includes(random))
      number = random;
  }

  return number.toString();
}