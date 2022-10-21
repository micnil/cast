export const equalsSet = (xs: Set<unknown>, ys: Set<unknown>): boolean =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));
