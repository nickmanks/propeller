import React, {Suspense} from 'react';
import Page from '#src/page';
import Map from '#src/map';
import Zoom from '#src/map/controls/zoom';
import Pan from '#src/map/controls/pan';
import Keyboard from '#src/map/controls/keyboard';
import TileLayer from '#src/map/layers/tile';
import Bounce from '#src/components/Spinner';

const App = ()=> (
  <Suspense fallback={<Bounce />}>
    <Page>
      <Map defaultZoom={0} minZoom={-1} maxZoom={3}>
        <Zoom />
        <Pan />
        <Keyboard />
        <TileLayer url={'http://localhost:8080/tiles'} />
      </Map>
    </Page>
  </Suspense>
);

export default App;
