import {useContext} from 'react';
import {CanvasContext} from '../canvas';
import {useKeyboard} from './hooks';

const Keyboard = ()=> {
  const {canvas, dispatch} = useContext(CanvasContext);

  useKeyboard(canvas, dispatch);

  return null;
};

export default Keyboard;
