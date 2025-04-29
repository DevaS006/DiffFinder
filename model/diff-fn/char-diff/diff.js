import { equals, removeEmpty, castInput } from "../../diff-utils/utils";
import { buildValues } from "./build-values";
import { extractCommon } from "./extract-common";
import { addToPath } from "./add-to-path";

export function diff(oldString, newString, tokenize) {


  // Tokenize both strings into arrays (default: chars)

  oldString = removeEmpty(tokenize(oldString));
  newString = removeEmpty(tokenize(newString));

  let newLen = newString.length, oldLen = oldString.length;
  let editLength = 1;
  let maxEditLength = newLen + oldLen;
  let bestPath = [{ oldPos: -1, lastComponent: null }];

  // Try to match common prefix right away
  let newPos = extractCommon(bestPath[0], newString, oldString, 0);

  // If completely equal, early return
  if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
    return buildValues( bestPath[0].lastComponent, newString, oldString);
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
        bestPath[diagonalPath - 1] = null;
      }

      let canAdd = false;
      if (addPath) {
        const addPathNewPos = addPath.oldPos - diagonalPath;
        canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
      }

      let canRemove = removePath && removePath.oldPos + 1 < oldLen;

      // If neither add/remove path is valid, skip this diagonal
      if (!canAdd && !canRemove) {
        bestPath[diagonalPath] = null;
        continue;
      }

      // Prefer path that made more progress (longer match)
      if (!canRemove || (canAdd && removePath.oldPos < addPath.oldPos)) {
        basePath = addToPath(addPath, true, false, 0);
      } else {
        basePath = addToPath(removePath, false, true, 1);
      }

      newPos = extractCommon(basePath, newString, oldString, diagonalPath, equals);


      // Complete match
      if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
        return buildValues( basePath.lastComponent, newString, oldString) || true;
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


    while (editLength <= maxEditLength) {
      let ret = execEditLength();
      if (ret) {
        return ret;
      }
    }
};


