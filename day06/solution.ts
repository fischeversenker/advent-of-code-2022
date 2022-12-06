import { posix } from "https://deno.land/std@0.65.0/path/mod.ts";

const fileName = posix.join(new URL(".", import.meta.url).pathname, "input_b");
const file = (await Deno.readTextFile(fileName)).trim();

function part1() {
  let markerStart = 0;
  for (let i = 3; i < file.length; i++) {
    const fourMostRecent = new Set(file.slice(i - 3, i + 1).split(''));
    if (fourMostRecent.size === 4) {
      markerStart = i + 1;
      break;
    }
  }
  console.log(markerStart);
}

part1();

// #######
// part 2

function part2() {
  let markerStart = 0;
  for (let i = 13; i < file.length; i++) {
    const fourMostRecent = new Set(file.slice(i - 13, i + 1).split(''));
    if (fourMostRecent.size === 14) {
      markerStart = i + 1;
      break;
    }
  }
  console.log(markerStart);
}

part2();
