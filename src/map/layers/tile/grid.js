import {v4 as uuidV4} from 'uuid';
import Tile, {TILE_SIZE} from './helpers';
import Canvas from '../../canvas/helpers';

export default class {
  constructor(url, tileSize = TILE_SIZE) {
    this.id = uuidV4();
    this.size = tileSize;
    this.url = url;
    this.tiles = {};
    this.renderKey = null;
  }

  getTileUrl(level, x, y) {
    return `${this.url}/${level}/${x}/${y}.jpg`;
  }

  assignTile(level, x, y, value) {
    if (!this.tiles[level]) {
      this.tiles[level] = {};
    }

    if (!this.tiles[level][x]) {
      this.tiles[level][x] = {};
    }

    this.tiles[level][x][y] = value;
  }

  checkLevel(level, x) {
    if (!this.tiles[level]) {
      return false;
    }

    if (!this.tiles[level][x]) {
      return false;
    }

    return true;
  }

  hasTile(level, x, y) {
    if (!this.checkLevel(level, x)) {
      return false;
    }

    if (!this.tiles[level][x][y]) {
      return false;
    }

    return true;
  }

  fetchingTile(level, x, y) {
    if (!this.checkLevel(level, x)) {
      return false;
    }

    if (this.tiles[level][x][y] === 'fetching') {
      return true;
    }

    return false;
  }

  async fetchTile(level, x, y) {
    this.assignTile(level, x, y, 'fetching');

    const url = this.getTileUrl(level, x, y);
    const response = await fetch(url);
    const blob = await response.blob();

    const bitmap = await createImageBitmap(blob, {resizeQuality: 'high'});

    this.assignTile(level, x, y, bitmap);
  }

  async fetchTiles(zoom) {
    const level = Tile.getLevel(zoom);
    const dim = Tile.getTileDimension(level);

    for (let y = 0; y < dim; y += 1) {
      for (let x = 0; x < dim; x += 1) {
        if (!this.hasTile(level, x, y) && !this.fetchingTile(level, x, y)) {
          await this.fetchTile(level, x, y);
        }
      }
    }
  }

  getPixelSize(canvas, zoom) {
    const mapDimension = Tile.getMapDimension(zoom);
    const {width} = Canvas.getDimensions(canvas);
    const pixelSize = mapDimension / width;

    return pixelSize;
  }

  async drawTiles(canvas, center, zoom, renderKey) {
    this.renderKey = renderKey;

    await this.fetchTiles(zoom);

    if (this.renderKey === renderKey) {
      this.draw(canvas, center, zoom);
    }
  }

  draw(canvas, [xOffset, yOffset], zoom) {
    const level = Tile.getLevel(zoom);
    const tilePixels = this.size * 2 ** (zoom - level);
    const dim = Tile.getTileDimension(level);

    for (let y = 0; y < dim; y += 1) {
      for (let x = 0; x < dim; x += 1) {
        const xPos = xOffset + x * tilePixels;
        const yPos = yOffset + y * tilePixels;

        if (!this.fetchingTile(level, x, y)) {
          Canvas.image(
            canvas,
            this.tiles[level][x][y],
            xPos,
            yPos,
            tilePixels,
            tilePixels
          );
        }
      }
    }
  }
}
