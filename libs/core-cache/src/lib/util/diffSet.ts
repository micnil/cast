type SetDiff<T> = {
  hasDiff: boolean;
  added: T[];
  removed: T[];
};

export const diffSet = <T>(before: Set<T>, after: Set<T>): SetDiff<T> => {
  const added: T[] = [];
  const removed: T[] = [];
  const all: T[] = [...before, ...after];
  all.forEach((item) => {
    if (before.has(item) && !after.has(item)) {
      added.push(item);
    } else if (!before.has(item) && after.has(item)) {
      removed.push(item);
    }
  });
  return {
    hasDiff: !!added.length && !!removed.length,
    added,
    removed,
  };
};
