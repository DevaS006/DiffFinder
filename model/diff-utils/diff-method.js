import { diff } from './../diff-fn/char-diff/diff';
import { tokenizeChar,tokenizeLine } from './utils';

// Character-level diffing using the base Diff class.
// This module creates an instance of the Diff class for character-by-character comparison.
// It exports a utility function `diffChars` to compute the character-level differences between two strings.

export function diffChars(oldStr, newStr) { return diff(oldStr, newStr, tokenizeChar); }


// Custom line-based diff logic extending the Diff class.
// This module tokenizes strings by lines (optionally preserving newline characters),
// compares lines with configurable whitespace and newline handling,
// and provides a `diffLines` utility for performing diffs between two multi-line strings.


export function diffLines(oldStr, newStr) { return diff(oldStr, newStr,tokenizeLine); }


