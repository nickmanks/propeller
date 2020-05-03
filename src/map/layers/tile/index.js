import {useContext} from 'react';
import {LayersContext} from '..';
import {useLayer} from '../hooks';
import TileGrid from './grid';

const TileLayer = ({tileSize, url})=> {
  const layers = useContext(LayersContext);

  useLayer(new TileGrid(url, tileSize), layers);

  return null;
};

export default TileLayer;
