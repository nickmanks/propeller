import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {window} from './globals';
import reducers from './reducers';

function getReduxDevTools() {
  const {__REDUX_DEVTOOLS_EXTENSION__} = window;
  let enhancer = (arg)=> arg;

  // eslint-disable-next-line no-process-env, no-undef
  /* istanbul ignore if */ if (process.env.NODE_ENV === 'production') {
    return enhancer;
  }

  /* istanbul ignore if */
  if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancer = __REDUX_DEVTOOLS_EXTENSION__();
  }

  return enhancer;
}

const initialState = {};

export const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(thunkMiddleware), getReduxDevTools())
);
