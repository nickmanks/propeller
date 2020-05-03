import {useState, useEffect} from 'react';
import Canvas from '../canvas/helpers';

export const useResizeRender = (canvas, state, collection)=> {
  const [prevListener, setListener] = useState(null);

  useEffect(()=> {
    if (prevListener) {
      window.removeEventListener('resize', prevListener);
    }

    const listener = window.addEventListener('resize', ()=> {
      if (Canvas.ready(canvas)) {
        Canvas.clear(canvas);

        for (const layer of collection) {
          layer.drawTiles(
            canvas,
            state.center,
            state.zoom,
            state.renderKey
          );
        }
      }
    });

    setListener(listener);
  }, [canvas, state, collection]);
};
