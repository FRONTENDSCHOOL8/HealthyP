export default function separateComma(items: string): string[] {
  return items.split(',');
}

const itemsString = "쌀국수, 고수가좋아,고수가고수처럼고수먹방"
const itemsArray = separateComma(itemsString);

console.log(itemsArray);
