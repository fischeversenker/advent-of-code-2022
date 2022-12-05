import { posix } from "https://deno.land/std@0.65.0/path/mod.ts";

const fileName = posix.join(new URL(".", import.meta.url).pathname, "input_b");
const file = await Deno.readTextFile(fileName);

const [stacksRaw, movementsRaw] = file.split("\n\n");

function getStacks(): string[][] {
  const stacks: string[][] = [];
  const stackLines = stacksRaw.split('\n').filter(Boolean);
  const lastStackLine = stackLines[stackLines.length - 1].replaceAll(' ', '');
  const maxLineLength = lastStackLine.length * 3 + lastStackLine.length - 1;

  stackLines.pop();
  stackLines.forEach(stackLine => {
    const line = stackLine.padEnd(maxLineLength);
    for(let i = 1, j = 0; i <= maxLineLength; i += 4, j++) {
      if (line[i].match(/\w/)) {
        stacks[j] ??= [];
        stacks[j].unshift(line[i]);
      }
    }
  });

  return stacks;
}

function getMovements() {
  const movements = movementsRaw.split("\n").filter(Boolean).map((movement) => {
    const match = movement.match(/move (\d+) from (\d+) to (\d+)/)!;
    const amount = Number(match[1]);
    const from = Number(match[2]) - 1;
    const to = Number(match[3]) - 1;
    return { amount, from, to };
  });

  return movements;
}

function getTopCrates(stacks: string[][]): string[] {
  return stacks.reduce((acc, stack) => {
    return [...acc, stack[stack.length - 1]];
  }, [] as string[]);
}

function part1() {
  const stacks = getStacks();
  const movements = getMovements();

  movements.forEach(movement => {
    for (let i = 0; i < movement.amount; i++) {
      const crate = stacks[movement.from].pop()!;
      stacks[movement.to].push(crate);
    }
  });

  console.log(getTopCrates(stacks).join(''))
}

part1();

// #######
// part 2

function part2() {
  const stacks = getStacks();
  const movements = getMovements();

  movements.forEach(movement => {
    const stackFromSize = stacks[movement.from].length;
    const crates = stacks[movement.from].splice(stackFromSize - movement.amount);
    stacks[movement.to].push(...crates);
  });

  console.log(getTopCrates(stacks).join(''))
}

part2();
