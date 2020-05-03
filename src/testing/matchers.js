/* eslint-env jest */
import {inspect} from 'util';
import {shallow} from 'enzyme';
import diff from 'jest-diff';
import {unwrappedShallow} from './helpers';

const shallowOpts = {context: {}, disableLifecycleMethods: true};

export const matchers = (expectMatch = expect)=> ({
  toDispatch: (store, action)=> ({
    pass: store.dispatchSpy.mock.calls.some(([actual])=> {
      try {
        expectMatch(actual).toEqual(action);
        return true;
      } catch (err) {
        return false;
      }
    }),
    message: ()=>
      'Expected store to dispatch:\n\n' +
      `${inspect(action, {colors: true, depth: null})}\n\n` +
      `but only found:\n\n${store.dispatchSpy.mock.calls
        .map(([actual])=> inspect(actual, {colors: true, depth: null}))
        .join('\n')}`
  }),

  toMatchElem(actual, expected) {
    const actualWrapped = unwrappedShallow(actual, shallowOpts);

    return {
      pass: actualWrapped.matchesElement(expected),
      message: ()=>
        `${this.utils.matcherHint('.toMatchElem')}\n\n${diff(
          actualWrapped.debug(),
          shallow(expected, shallowOpts).debug()
        )}`
    };
  },

  toContainMatching: (actual, expected)=> {
    const actualWrapped = unwrappedShallow(actual, shallowOpts);
    const toContain = shallow(expected, shallowOpts).debug();
    const actualDebug = actualWrapped.debug();

    return {
      pass: actualWrapped.containsMatchingElement(expected),
      message: ()=>
        `Expected:\n${actualDebug}\n\nto contain matching:\n\n${toContain}.`
    };
  }
});
