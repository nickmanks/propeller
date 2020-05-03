import {useContext} from 'react';
import {useResizeRender} from './hooks';
import {CanvasContext} from '../canvas';
import {LayersContext} from '../layers';
import Canvas from '../canvas/helpers';

const Renderer = ()=> {
  const {canvas, state} = useContext(CanvasContext);
  const {collection} = useContext(LayersContext);

  useResizeRender(canvas, state, collection);

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

  return null;
};

export default Renderer;
