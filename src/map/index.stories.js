import React from 'react';
import Map from '.';
import Zoom from './controls/zoom';
import Pan from './controls/pan';
import Keyboard from './controls/keyboard';
import TileLayer from './layers/tile';
import {component} from '#src/testing/snapshots';

component('Map')
  .when('standard', ()=> (
    <Map defaultZoom={0} minZoom={-1} maxZoom={3}>
      <Zoom />
      <Pan />
      <Keyboard />
      <TileLayer url={'http://localhost:9000/tiles'} />
    </Map>
  ))
  .when('with zoom', ()=> (
    <Map defaultZoom={0} minZoom={-1} maxZoom={3}>
      <Zoom />
      <TileLayer url={'http://localhost:9000/tiles'} />
    </Map>
  ))
  .when('with pan', ()=> (
    <Map defaultZoom={0} minZoom={-1} maxZoom={3}>
      <Pan />
      <TileLayer url={'http://localhost:9000/tiles'} />
    </Map>
  ))
  .when('with keyboard controls', ()=> (
    <Map defaultZoom={0} minZoom={-1} maxZoom={3}>
      <Keyboard />
      <TileLayer url={'http://localhost:9000/tiles'} />
    </Map>
  ));
