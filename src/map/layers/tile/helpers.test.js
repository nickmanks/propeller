import Tile from './helpers';

describe('Tile Module', ()=> {
  it('returns correct tile count', ()=> {
    expect(Tile.getTileCount(0)).toBe(1);
    expect(Tile.getTileCount(1)).toBe(4);
  });

  it('returns correct map dimensions', ()=> {
    expect(Tile.getMapDimension(0)).toBe(256);
    expect(Tile.getMapDimension(1)).toBe(512);
  });

  it('returns correct tile coordinates array', ()=> {
    expect(Tile.getTileArray(0)).toEqual([[0, 0]]);
    expect(Tile.getTileArray(1)).toEqual([
      [0, 0], [256, 0],
      [0, 256], [256, 256]
    ]);
    expect(Tile.getTileArray(2)).toEqual([
      [0, 0], [256, 0], [512, 0],
      [0, 256], [256, 256], [512, 256],
      [0, 512], [256, 512], [512, 512]
    ]);
  });
});
