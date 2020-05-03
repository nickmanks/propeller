
export const TILE_SIZE = 256;

export default {
  getLevel: (zoom)=> (zoom < 0 ? 0 : Math.floor(zoom)),

  // Number of tiles wide or high
  getTileDimension: (zoom)=> {
    if (zoom < 0) {
      return 0;
    }

    const dim = Math.pow(2, zoom);

    return dim;
  },

  // Return total number of tiles for zoom level
  getTileCount: (zoom)=> Math.pow(2, zoom) * Math.pow(2, zoom),

  // Get the width and height dimension of the map in pixels
  getMapDimension: (zoom, tileSize = TILE_SIZE)=> Math.ceil(
    tileSize * Math.pow(2, zoom)
  ),

  // Array of tile (top, left) coordinates for each tile
  // [[0, 0], [256, 0], [512, 0] ...]
  getTileArray: (zoom, tileSize = TILE_SIZE)=> {
    const tiles = [];


    for (let y = 0; y < zoom + 1; y += 1) {
      for (let x = 0; x < zoom + 1; x += 1) {
        tiles[y*(zoom + 1) + x] = [x * tileSize, y * tileSize];
      }
    }

    return tiles;
  },

  // Returns (top, left) coordinate for a given tile
  getTileLocation: (tiles, tileNum)=> tiles[tileNum]
};
