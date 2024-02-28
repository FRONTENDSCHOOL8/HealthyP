export default function separateComma(items: string): string[] {
  return items.split(',').map((item) => item.trim());
}
