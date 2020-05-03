import {useContext} from 'react';
import {CanvasContext} from '../canvas';
import {useZoom} from './hooks';

const Zoom = ()=> {
  const {canvas, dispatch} = useContext(CanvasContext);

  useZoom(canvas, dispatch);

  return null;
};

export default Zoom;
