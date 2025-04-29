
//  Token equality check (strict by default).
export function equals(left, right) {
  return left === right
};

// Join characters back into a string.
export function join(chars) {
  return chars.join('');
};

// Removes falsy tokens from an array (e.g., undefined or '').
export function removeEmpty(array) {
  return array.filter(Boolean);
};

//  Tokenize string into array (default: characters)
export function tokenizeChar(value) {
  return Array.from(value);
};

//  Tokenize string into array (default: lines)

export const tokenizeLine = function (value) {

let linesAndNewlines = value.split(/(\n|\r\n)/);

  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }

  return linesAndNewlines;
};