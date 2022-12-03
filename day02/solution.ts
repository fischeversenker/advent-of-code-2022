import { posix } from "https://deno.land/std@0.65.0/path/mod.ts";

const fileName = posix.join(new URL('.', import.meta.url).pathname, 'input_b');
const file = await Deno.readTextFile(fileName);

const rock = {
  letters: ['A', 'X'],
  value: 1
};
const paper = {
  letters: ['B', 'Y'],
  value: 2
};
const scissors = {
  letters: ['C', 'Z'],
  value: 3
};



const games = file
  .split('\n')
  .filter(Boolean)
  .map(list => list.split(' '));

let sum = 0;
games.forEach(game => {
  if (game[0] === 'A') {
    if (game[1] === 'X') {
      sum += 1 + 3;
    } else if (game[1] === 'Y') {
      sum += 2 + 6;
    } else {
      sum += 3;
    }
  } else if (game[0] === 'B') {
    if (game[1] === 'X') {
      sum += 1;
    } else if (game[1] === 'Y') {
      sum += 2 + 3;
    } else {
      sum += 3 + 6;
    }
  } else {
    if (game[1] === 'X') {
      sum += 1 + 6;
    } else if (game[1] === 'Y') {
      sum += 2;
    } else {
      sum += 3 + 3;
    }
  }
});
console.log(sum);


let sum2 = 0;
games.forEach(game => {
  if (game[0] === 'A') {
    if (game[1] === 'X') {
      sum2 += 3;
    } else if (game[1] === 'Y') {
      sum2 += 1 + 3;
    } else {
      sum2 += 2 + 6;
    }
  } else if (game[0] === 'B') {
    if (game[1] === 'X') {
      sum2 += 1;
    } else if (game[1] === 'Y') {
      sum2 += 2 + 3;
    } else {
      sum2 += 3 + 6;
    }
  } else {
    if (game[1] === 'X') {
      sum2 += 2;
    } else if (game[1] === 'Y') {
      sum2 += 3 + 3;
    } else {
      sum2 += 1 + 6;
    }
  }
});
console.log(sum2);
