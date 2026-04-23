const SINGLE_LINE_LIMIT = 24;
const LINE_LIMIT = 22;
const MAX_LINES = 3;

export function splitTitle(title: string): string[] {
  const normalized = title.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return [""];
  }

  if (normalized.length <= SINGLE_LINE_LIMIT) {
    return [normalized];
  }

  const words = normalized.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (currentLine && nextLine.length > LINE_LIMIT) {
      lines.push(currentLine);
      currentLine = word;
      continue;
    }

    currentLine = nextLine;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  if (lines.length <= MAX_LINES) {
    return lines;
  }

  return [...lines.slice(0, MAX_LINES - 1), lines.slice(MAX_LINES - 1).join(" ")];
}
