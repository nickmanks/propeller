import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from '#src/app';
import {store} from '#src/store';
import {document} from '#src/globals';
import '#scss/fonts.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
