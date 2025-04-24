import { buildValues } from "../Diff_Fn/Char diff/buildValues";

import { equals, removeEmpty, castInput, postProcess } from "../Diff Utils/Utils";
import { extractCommon } from "../Diff_Fn/Char diff/extractCommon";
import { addToPath } from "../Diff_Fn/Char diff/addToPath";

export function diff(oldString, newString, tokenize, options = {}) {
  let callback = options.callback;

  // If user passed a function instead of options object
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  // Final result processing + callback dispatch.
  function done(value) {
    value = postProcess(value, options);
    if (callback) {
      setTimeout(function () { callback(value); }, 0);
      return undefined;
    } else {
      return value;
    }
  }


  oldString = castInput(oldString);
  newString = castInput(newString);

  // Tokenize both strings into arrays (default: chars)

  oldString = removeEmpty(tokenize(oldString, options));
  newString = removeEmpty(tokenize(newString, options));

  let newLen = newString.length, oldLen = oldString.length;
  let editLength = 1;
  let maxEditLength = newLen + oldLen;
  let bestPath = [{ oldPos: -1, lastComponent: undefined }];

  // Try to match common prefix right away
  let newPos = extractCommon(bestPath[0], newString, oldString, 0, options);

  // If completely equal, early return
  if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
    return done(buildValues( bestPath[0].lastComponent, newString, oldString));
  }

  // Used to avoid unnecessary diagonals

  let minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;

  function execEditLength() {
    for (
      let diagonalPath = Math.max(minDiagonalToConsider, -editLength);
      diagonalPath <= Math.min(maxDiagonalToConsider, editLength);
      diagonalPath += 2
    ) {
      let basePath;
      let removePath = bestPath[diagonalPath - 1],
        addPath = bestPath[diagonalPath + 1];
      if (removePath) {
        bestPath[diagonalPath - 1] = undefined;
      }

      let canAdd = false;
      if (addPath) {
        const addPathNewPos = addPath.oldPos - diagonalPath;
        canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
      }

      let canRemove = removePath && removePath.oldPos + 1 < oldLen;

      // If neither add/remove path is valid, skip this diagonal
      if (!canAdd && !canRemove) {
        bestPath[diagonalPath] = undefined;
        continue;
      }

      // Prefer path that made more progress (longer match)
      if (!canRemove || (canAdd && removePath.oldPos < addPath.oldPos)) {
        basePath = addToPath(addPath, true, false, 0, options);
      } else {
        basePath = addToPath(removePath, false, true, 1, options);
      }

      newPos = extractCommon(basePath, newString, oldString, diagonalPath, equals, options);


      // Complete match
      if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
        return done(buildValues( basePath.lastComponent, newString, oldString,)) || true;
      } else {
        bestPath[diagonalPath] = basePath;
        if (basePath.oldPos + 1 >= oldLen) {
          maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
        }
        if (newPos + 1 >= newLen) {
          minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
        }
      }
    }

    editLength++;
  }


  if (callback) {
    (function exec() {
      setTimeout(function () {
        if (editLength > maxEditLength) {
          return callback();
        }

        if (!execEditLength()) {
          exec();
        }
      }, 0);
    }());
  } else {
    while (editLength <= maxEditLength) {
      let ret = execEditLength();
      if (ret) {
        return ret;
      }
    }
  }
};


