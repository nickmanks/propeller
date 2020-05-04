import {useEffect, useState} from 'react';
import Canvas from '../canvas/helpers';

const SCROLL_FACTOR = 1000;
const KEY_FACTOR = 10;

// eslint-disable-next-line no-magic-numbers
const ZOOM_IN_KEYS = new Set([95, 45]);
// eslint-disable-next-line no-magic-numbers
const ZOOM_OUT_KEYS = new Set([61, 43]);

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

export const useZoom = (ref, dispatch)=> {
  useEffect(()=> {
    if (ref.current) {
      ref.current.addEventListener('wheel', (evt)=> {
        evt.preventDefault();
        evt.stopPropagation();

        const scrollDelta = evt.wheelDelta / SCROLL_FACTOR;

        dispatch({
          type: 'set-zoom',
          delta: scrollDelta
        });
      });
    }
  }, [ref.current]);
};

export const usePan = (ref, dispatch)=> {
  const [start, setStart] = useState({x: 0, y: 0});
  const [delta, setDelta] = useState({x: 0, y: 0});
  const [up, setUp] = useState(true);

  useEffect(()=> {
    ref.current.addEventListener('mousedown', (event)=> {
      const {x, y} = Canvas.getMousePosition(ref, event);

      setStart({x, y});
      setUp(false);
    });

    ref.current.addEventListener('mousemove', (event)=> {
      const {x, y} = Canvas.getMousePosition(ref, event);

      setDelta({x, y});
      setStart({x, y});
    });

    ref.current.addEventListener('mouseup', ()=> {
      setUp(true);
    });
  }, [ref.current]);

  useEffect(()=> {
    if (!up) {
      dispatch({
        type: 'set-center',
        delta: [delta.x - start.x, delta.y - start.y]
      });
    }
  }, [delta]);
};

export const useKeyboard = (ref, dispatch)=> {
  useEffect(()=> {
    if (ref.current) {
      document.addEventListener('keypress', (evt)=> {
        evt.preventDefault();
        evt.stopPropagation();

        const key = evt.which ? evt.which : event.keyCode;

        if (ZOOM_IN_KEYS.has(key)) {
          dispatch({
            type: 'set-zoom',
            delta: -0.2
          });
        }

        if (ZOOM_OUT_KEYS.has(key)) {
          dispatch({
            type: 'set-zoom',
            delta: 0.2
          });
        }
      });

      document.addEventListener('keydown', (evt)=> {
        const key = evt.which ? evt.which : event.keyCode;

        if (key === LEFT_KEY) {
          dispatch({
            type: 'set-center',
            delta: [-KEY_FACTOR, 0]
          });
        }

        if (key === RIGHT_KEY) {
          dispatch({
            type: 'set-center',
            delta: [KEY_FACTOR, 0]
          });
        }

        if (key === DOWN_KEY) {
          dispatch({
            type: 'set-center',
            delta: [0, KEY_FACTOR]
          });
        }

        if (key === UP_KEY) {
          dispatch({
            type: 'set-center',
            delta: [0, -KEY_FACTOR]
          });
        }
      });
    }
  }, [ref.current]);
};
