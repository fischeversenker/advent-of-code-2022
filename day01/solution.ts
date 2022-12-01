import { posix } from "https://deno.land/std@0.65.0/path/mod.ts";

const fileName = posix.join(new URL('.', import.meta.url).pathname, 'input_b');
const file = await Deno.readTextFile(fileName);

const lists = file
  .split('\n\n')
  .map(list => list
    .split('\n')
    .map(value => Number(value)
  )
  .reduce((acc, value) => acc + value, 0))
  .sort((a, b) => a - b)
  .reverse();
console.log(lists[0] + lists[1] + lists[2])
