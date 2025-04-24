//  Reconstructs the final diff components with actual string values.
//  lastComponent - The final diff component node (linked list tail).
//  newString - Tokenized array of the "after" string.
//  oldString - Tokenized array of the "before" string.

import { join } from "../../diff-utils/utils";
 
function buildValues( lastComponent, newString, oldString) {
  const components = [];

  // Traverse the linked list in reverse and collect components
  while (lastComponent) {
    components.push(lastComponent);
    const nextComponent = lastComponent.previousComponent;
    delete lastComponent.previousComponent; // clean up
    lastComponent = nextComponent;
  }

  // Reverse to process in original order
  components.reverse();

  let newPos = 0, oldPos = 0;

  for (const component of components) {
    // Unchanged or added
    if (!component.removed) {
      if (!component.added ) {
        // Use the longest version of each token between old and new
        const value = newString.slice(newPos, newPos + component.count)
          .map((val, i) => {
            const oldVal = oldString[oldPos + i];
            return oldVal.length > val.length ? oldVal : val;
          });
        component.value = join(value);
      } else {
        // Regular reconstruction for new or unchanged tokens
        component.value = join(newString.slice(newPos, newPos + component.count));
      }

      newPos += component.count;
      if (!component.added) oldPos += component.count;
    }
    // Removed
    else {
      component.value = join(oldString.slice(oldPos, oldPos + component.count));
      oldPos += component.count;
    }
  }

  return components;
}
export {buildValues}