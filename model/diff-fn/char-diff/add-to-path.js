 // Builds a new path from the previous one with an added/removed operation.

 export function addToPath(path, added, removed, oldPosInc) {
  
    let last = path.lastComponent;
    if (last && last.added === added && last.removed === removed) {
      return {
        oldPos: path.oldPos + oldPosInc,
        lastComponent: { count: last.count + 1, added: added, removed: removed, previousComponent: last.previousComponent }
      };
    } else {
      return {
        oldPos: path.oldPos + oldPosInc,
        lastComponent: { count: 1, added: added, removed: removed, previousComponent: last }
      };
    }
  };
