import { DiffType } from '../char-diff/constants';
import { diffChars } from '../../diff-utils/DiffMethod';

// /home/deva-zstch1414/Desktop/React_Mail/json_dif_analyser/src/Diff Utils/DiffMethod.js

// Computes character-level differences between old and new strings and returns structured diff info for left and right views.

export const computeWordDiff = (oldValue, newValue) => {
  const computedDiff = { left: [], right: [] };
  const diffArray = diffChars(oldValue, newValue);
//   It returns an object containing two arrays: `left` and `right`, which represent the diffed output aligned for a split-view comparison.

//    For added characters (present only in `newValue`), an object with type `ADDED` is pushed to `right`.
//   For removed characters (present only in `oldValue`), an object with type `REMOVED` is pushed to `left`.
//   For unchanged characters, an object with type `DEFAULT` is added to both `left` and `right`, allowing them to align correctly for unified or split comparison rendering.
  diffArray.forEach(({ added, removed, value }) => {
    const diffInformation = {};
    if (added) {
      diffInformation.type = DiffType.ADDED;
      diffInformation.value = value;
      computedDiff.right.push(diffInformation);
    } else if (removed) {
      diffInformation.type = DiffType.REMOVED;
      diffInformation.value = value;
      computedDiff.left.push(diffInformation);
    } else {
      diffInformation.type = DiffType.DEFAULT;
      diffInformation.value = value;
      computedDiff.right.push(diffInformation);
      computedDiff.left.push(diffInformation);
    }
  });

  return computedDiff;
};

