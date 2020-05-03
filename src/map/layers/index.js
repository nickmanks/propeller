import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const LayersContext = createContext();

const Layers = ({children})=> {
  const [collection, setCollection] = useState([]);

  return (
    <LayersContext.Provider value={{collection, setCollection}}>
      {children}
    </LayersContext.Provider>
  );
};
Layers.propTypes = {
  children: PropTypes.any
};

export default Layers;
