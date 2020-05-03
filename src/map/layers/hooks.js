import {useEffect} from 'react';

export const useLayer = (layer, {collection, setCollection})=> {
  useEffect(()=> {
    setCollection([...collection, layer]);
  }, []);
};
