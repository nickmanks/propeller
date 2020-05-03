/* eslint no-undef: 0 */

/**
 * Mock a css file by simply returning the prop name as the class name.
 */
export default new Proxy(
  {},
  {
    get: (target, prop) => `mock-${prop}`
  }
);
