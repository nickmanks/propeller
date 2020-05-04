import React, {useRef, createContext} from 'react';
import PropTypes from 'prop-types';
import {useCanvas, useResize} from './hooks';
import Renderer from '../renderer';
import styles from './index.scss';

export const CanvasContext = createContext();

const Canvas = ({container, defaultZoom, minZoom, maxZoom, children})=> {
  const canvas = useRef();
  const {state, dispatch} = useCanvas(
    {
      zoom: defaultZoom === undefined ? 0 : defaultZoom,
      center: [0, 0]
    },
    {minZoom, maxZoom}
  );

  useResize(canvas, container);

  return (
    <>
      <canvas className={styles.canvas} ref={canvas} />
      <CanvasContext.Provider value={{canvas, state, dispatch}}>
        {children}
        <Renderer />
      </CanvasContext.Provider>
    </>
  );
};
Canvas.propTypes = {
  container: PropTypes.string,
  defaultZoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  children: PropTypes.any
};

export default Canvas;
