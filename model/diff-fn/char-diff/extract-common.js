  // Matches equal characters on the diagonal path and appends them to the path.

  import { equals } from "../../diff-utils/utils";
function extractCommon(basePath, newString, oldString, diagonalPath) {
    let newLen = newString.length,
      oldLen = oldString.length,
      oldPos = basePath.oldPos,
      newPos = oldPos - diagonalPath,

      commonCount = 0;
    while (newPos + 1 < newLen && oldPos + 1 < oldLen && equals(oldString[oldPos + 1], newString[newPos + 1])) {
      newPos++;
      oldPos++;
      commonCount++;
    }

    if (commonCount) {
      basePath.lastComponent = { count: commonCount, previousComponent: basePath.lastComponent, added: false, removed: false };
    }

    basePath.oldPos = oldPos;
    return newPos;
  };
  export {extractCommon}