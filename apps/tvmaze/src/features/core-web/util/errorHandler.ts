export const errorHandler = (err: unknown): Error => {
  console.error(err);
  if (err instanceof Error) {
    return err;
  } else if (typeof err === "string") {
    return new Error(err);
  } else {
    return new Error(`Unexpected Error: ${JSON.stringify(err)}`);
  }
};
