import { posix } from "https://deno.land/std@0.65.0/path/mod.ts";

const fileName = posix.join(new URL('.', import.meta.url).pathname, 'input_b');
const file = await Deno.readTextFile(fileName);

const pairs = file
  .split('\n')
  .filter(Boolean)
  .map(list => list
    .split(',')
    .map(value => value.split('-').map(stringValue => Number(stringValue))
  ));

const redundantPairs = pairs.reduce((acc, pair) => {
  const first = pair[0];
  const second = pair[1];

  const firstIncludesSecond = first[0] <= second[0] && first[1] >= second[1];
  const secondIncludesFirst = first[0] >= second[0] && first[1] <= second[1];

  if (firstIncludesSecond || secondIncludesFirst) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log(redundantPairs)

// #######
// part 2

const overlappingPairs = pairs.reduce((acc, pair) => {
  const first = pair[0];
  const second = pair[1];

  const firstEndsInSecond = first[1] >= second[0] && first[0] <= second[1];
  const secondEndsInFirst = first[0] >= second[1] && first[1] <= second[0];
  if (firstEndsInSecond || secondEndsInFirst) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log(overlappingPairs);
