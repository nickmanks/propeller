import React from 'react';
import PropTypes from 'prop-types';
import Layers from './layers';
import Canvas from './canvas';
import styles from './index.scss';

const Map = ({children, defaultZoom, minZoom, maxZoom})=> (
  <div id={'map-container'} className={styles.map}>
    <Layers>
      <Canvas
        container={'map-container'}
        defaultZoom={defaultZoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
      >
        {children}
      </Canvas>
    </Layers>
  </div>
);
Map.propTypes = {
  children: PropTypes.any,
  defaultZoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number
};

export default Map;
