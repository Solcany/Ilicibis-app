import { assert } from "Utils/error.js";

export const joinStyles = (classes) => {
  assert(classes.length, "argument must be array");
  assert(classes.length > 0, "array must contain at least 1 class");
  return classes.join(" ");
};
