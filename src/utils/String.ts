/**
 * Generate a hash from a string
 */
const stringToHashCode = (stringValue: string): number => {
  return stringValue.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};

export { stringToHashCode };
