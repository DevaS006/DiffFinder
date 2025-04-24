import { DiffType } from '../Diff_Fn/Char diff/constants';
import { constructLines } from '../Diff_Fn/line diff/constructLines';
import { computeWordDiff } from '../Diff_Fn/line diff/computeWordDiff';
// import { diffLines } from '../DiffMethod';
import {diffLines} from '../Diff Utils/DiffMethod'; 


// Computes detailed line-level diff information between two strings.

// This function compares two string inputs (`oldString`, `newString`) using a line-based diffing approach, and produces a structured result for rendering line-by-line differences. It also supports character-level word diffs inside modified lines (if `disableWordDiff` is false).

export const computeLineInformation = (
  oldString,
  newString,
  disableWordDiff = false,
  linesOffset = 0
) => {
  const diffArray = diffLines(oldString, newString, {
    newlineIsToken: true,
    ignoreWhitespace: false,
    ignoreCase: false,
  });

  let rightLineNumber = linesOffset;
  let leftLineNumber = linesOffset;
  let lineInformation = [];
  let counter = 0;
  const diffLineIndexes = [];  // Tracks all lines that have diffs (removed/added).
  const ignoreDiffIndexes = []; // Used to prevent duplicated processing of mapped diff lines.


  // Helper to convert a single diff chunk (`value`) into structured line information.It handles REMOVED/ADDED/DEFAULT lines and optionally injects word-level diffs.
  const getLineInformation = (value, diffIndex, added, removed, evaluateOnlyFirstLine) => {
    const lines = constructLines(value);
    return lines.map((line, lineIndex) => {
      const left = {};
      const right = {};


      // Skip if this line index has already been paired, or is not the first line in a multi-line segment (when pairing).
      if (
        ignoreDiffIndexes.includes(`${diffIndex}-${lineIndex}`) ||
        (evaluateOnlyFirstLine && lineIndex !== 0)
      ) return undefined;

      if (added || removed) {
        if (!diffLineIndexes.includes(counter)) diffLineIndexes.push(counter);

        if (removed) {
          leftLineNumber += 1;
          left.lineNumber = leftLineNumber;
          left.type = DiffType.REMOVED;
          left.value = line || ' ';

          // Look ahead to pair this removed line with the following added one for word-diffing


          const nextDiff = diffArray[diffIndex + 1];
          if (nextDiff?.added) {
            const nextDiffLines = constructLines(nextDiff.value)[lineIndex];
            if (nextDiffLines) {
              const { value: rightValue, lineNumber, type } = getLineInformation(
                nextDiff.value, diffIndex, true, false, true
              )[0].right;
              ignoreDiffIndexes.push(`${diffIndex + 1}-${lineIndex}`);
              right.lineNumber = rightLineNumber + 1;
              right.type = DiffType.ADDED;
              right.value = disableWordDiff
                ? rightValue
                : computeWordDiff(line, rightValue).right;
              if (!disableWordDiff) left.value = computeWordDiff(line, rightValue).left;
            }
          }
        } else {
          // Just an added line (not paired with a removed one)
          rightLineNumber += 1;
          right.lineNumber = rightLineNumber;
          right.type = DiffType.ADDED;
          right.value = line || ' ';
        }
      } else {
        // Unchanged line

        leftLineNumber += 1;
        rightLineNumber += 1;
        left.lineNumber = leftLineNumber;
        left.type = DiffType.DEFAULT;
        left.value = line;
        right.lineNumber = rightLineNumber;
        right.type = DiffType.DEFAULT;
        right.value = line;
      }
      counter++;
      return { left, right };
    }).filter(Boolean);
  };

    // Process all diff segments from the line diff

  diffArray?.forEach(({ added, removed, value }, index) => {
    lineInformation = [
      ...lineInformation,
      ...getLineInformation(value, index, added, removed),
    ];
  });

  return { lineInformation, diffLines: diffLineIndexes };
};
