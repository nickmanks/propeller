/* eslint no-undef: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint no-empty-function: 0 */
import ReactDOM from 'react-dom';

export const describe = jasmine.currentEnv_.describe;
export const it = jasmine.currentEnv_.it;
export const beforeEach = jasmine.currentEnv_.beforeEach;
export const afterEach = jasmine.currentEnv_.afterEach;
export const xit = jasmine.currentEnv_.xit;
export const xdescribe = jasmine.currentEnv_.xdescribe;
export const fit = jasmine.currentEnv_.fit;
export const after = () => { };
export const before = () => { };

export const snapshot = (name, story) => {
  it(name, () => {
    // Work around for portal breaking react-test-renderer
    // https://github.com/facebook/react/issues/11565
    ReactDOM.createPortal = jest.fn((element) => element);
    const renderer = require('react-test-renderer');
    const tree = renderer.create(story).toJSON();

    expect(tree).toMatchSnapshot();
  });
};

// eslint-disable-next-line
export const storiesOf = function storiesOf() {
  const api = {};
  let story = null;

  api.add = (name, func) => {
    story = func();
    snapshot(name, story);
    return api;
  };

  api.addWithInfo = (name, func) => {
    story = func();
    snapshot(name, story);
    return api;
  };

  return api;
};

export const action = () => { };

export const linkTo = () => { };

export const specs = (spec) => {
  spec();
};
