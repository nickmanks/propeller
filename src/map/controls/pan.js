import {useContext} from 'react';
import {CanvasContext} from '../canvas';
import {usePan} from './hooks';

const Pan = ()=> {
  const {canvas, dispatch} = useContext(CanvasContext);

  usePan(canvas, dispatch);

  return null;
};

export default Pan;
