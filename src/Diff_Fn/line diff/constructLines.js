// Splits a multi-line string into an array of individual lines with controlled handling of empty lines at the start and end.

export const constructLines = (value) => {
  const lines = value.split('\n');
  const isAllEmpty = lines.every((val) => !val);

// If all lines are empty:  Return an empty array if there are exactly 2 empty lines (likely a single blank newline).Otherwise, remove the last empty line and return the rest.
//  If not all lines are empty:Remove the last line if it's empty (trailing newline).Remove the first line if it's empty (leading newline).Return the cleaned-up array of lines.
  if (isAllEmpty) {
    if (lines.length === 2) return [];
    lines.pop();
    return lines;
  }
  const lastLine = lines[lines.length - 1];
  const firstLine = lines[0];
  if (!lastLine) lines.pop();
  if (!firstLine) lines.shift();
  return lines;
};


