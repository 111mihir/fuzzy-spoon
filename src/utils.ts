// A helper function that automatically types tuples
export function tuplify<T extends any[]>(...elements: T) {
  return elements;
}
