// These are used to classify portions of text during diff computation.
// DEFAULT: Represents unchanged text segments common to both old and new values.
// ADDED: Represents text that exists only in the new value (i.e., added content).
// REMOVED: Represents text that exists only in the old value (i.e., removed content).

export const DiffType = {
  DEFAULT: 0,
  ADDED: 1,
  REMOVED: 2,
};


