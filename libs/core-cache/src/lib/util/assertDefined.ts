export function assertDefined<T>(
  val: T | undefined | null,
  msg?: string
): asserts val is T {
  if (val === undefined || val === null) {
    throw new Error(msg ?? "Assert value should be defined");
  }
};
