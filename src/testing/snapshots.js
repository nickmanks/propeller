import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import expectMatcher from 'expect';
import {INITIAL_VIEWPORTS} from '@storybook/addon-viewport';
import {storiesOf, specs, describe, it} from '../../.storybook/specs';
import {matchers} from './matchers';
import reducers from '#src/reducers';

expectMatcher.extend(matchers(expectMatcher));

export const expect = expectMatcher;

const when = (stories)=> (storyName, component, specifications)=> {
  const specificationsFunction = (cmp)=> ()=> {
    for (const key of Reflect.ownKeys(specifications)) {
      it(key, async ()=> specifications[key](cmp));
    }
  };

  const storyFunction = ()=> {
    const specsFunction = specifications
      ? specificationsFunction(component())
      : // eslint-disable-next-line
        () => {};

    specs(()=> describe(storyName, specsFunction));

    return component();
  };

  stories.add(storyName, storyFunction);

  return {when: when(stories)};
};

export const component = (moduleName, viewport = 'responsive')=> {
  const stories = storiesOf(moduleName, module);

  if (stories.addParameters) {
    stories.addParameters({
      viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: viewport
      }
    });
  }

  return {
    when: when(stories)
  };
};

export const storyStore = (state = {}, middlewares = [])=>
  createStore(
    reducers,
    state,
    applyMiddleware(thunkMiddleware, ...middlewares)
  );
