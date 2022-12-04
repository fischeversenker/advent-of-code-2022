import { posix } from "https://deno.land/std@0.65.0/path/mod.ts";

const fileName = posix.join(new URL('.', import.meta.url).pathname, 'input_b');
const file = await Deno.readTextFile(fileName);

function getItemPriority(item: string) {
  const charCode = item.charCodeAt(0);
  if (charCode >= 97) {
    return charCode - 96;
  }
  return charCode - 64 + 26;
}

const rucksacks = file
  .split('\n')
  .filter(Boolean);
const compartments = rucksacks.map(list => [list.substring(0, list.length / 2), list.substring(list.length / 2)]);

const inBothComps = compartments.map(([comp1, comp2]) => {
  const itemSet = new Set<string>(comp1.split(''));
  return comp2.split('').find(item => itemSet.has(item))!;
});

const priorities = inBothComps.map(item => getItemPriority(item));
console.log(priorities.reduce((acc, prio) => acc + prio, 0));

// part 2

const groups: string[][] = [];
for (let i = 0; i < (rucksacks.length / 3); i++) {
  groups[i] ??= [] ;
  groups[i].push(rucksacks[3 * i]);
  groups[i].push(rucksacks[3 * i + 1]);
  groups[i].push(rucksacks[3 * i + 2]);
}

const badges = groups.map(group => {
  const itemMap = new Map<string, boolean[]>();
  group.forEach((rucksack, index) => {
    const items = rucksack.split('');
    items.forEach(item => {
      const currentValue = itemMap.get(item) ?? [];
      currentValue[index] = true;
      itemMap.set(item, currentValue);
    });
  });

  let badge = '';
  for (const [key, values] of itemMap) {
    const filteredValues = values.filter(value => value === true);
    if (filteredValues.length === 3) {
      badge = key;
      break;
    }
  }
  return badge;
});
console.log(badges.reduce((acc, badge) => acc + getItemPriority(badge), 0));
