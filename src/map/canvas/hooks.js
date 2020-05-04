import {useEffect, useReducer} from 'react';
import Canvas from './helpers';
import {minMax} from '../utils';

// TODO clean up listeners when canvas ref changes

const canvasReducer = ({minZoom, maxZoom})=> (state, action)=> {
  switch (action.type) {
    case 'set-zoom':
      return {
        ...state,
        zoom: minMax(state.zoom + action.delta, minZoom, maxZoom),
        renderKey: Math.random()
      };

    case 'set-center':
      return {
        ...state,
        center: [
          state.center[0] + action.delta[0],
          state.center[1] + action.delta[1]
        ],
        renderKey: Math.random()
      };

    default:
      throw new Error();
  }
};

export const useCanvas = (defaultState, options)=> {
  const [state, dispatch] = useReducer(canvasReducer(options), defaultState);

  return {state, dispatch};
};

export const useResize = (ref, container)=> {
  useEffect(()=> {
    Canvas.setup(ref, container);
  }, [ref.current]);

  useEffect(()=> {
    if (ref.current) {
      window.addEventListener('resize', ()=> {
        Canvas.setup(ref, container);
      });
    }
  }, [ref.current]);
};
