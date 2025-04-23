
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
    let ret = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i]) {
        ret.push(array[i]);
      }
    }
    return ret;
  };

  // Hook for preprocessing the string (e.g., cast string, trim, etc.).
  export function castInput(value) {
    return value;
  };
 
//  Hook for final modification of diff output.

  export function postProcess(changeObjects) {
    return changeObjects;
  }

  //  Tokenize string into array (default: characters)
  export function tokenizeChar(value) {
    return Array.from(value);
  };
  
  //  Tokenize string into array (default: lines)

  export const tokenizeLine = function(value, options) {
    if(options.stripTrailingCr) {
      value = value.replace(/\r\n/g, '\n');
    }
  
    let retLines = [],
        linesAndNewlines = value.split(/(\n|\r\n)/);
  
    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    }
  
    for (let i = 0; i < linesAndNewlines.length; i++) {
      let line = linesAndNewlines[i];
  
      if (i % 2 && !options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        retLines.push(line);
      }
    }
  
    return retLines;
  };