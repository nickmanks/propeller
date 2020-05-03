import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import App from '.';
import Map from '#src/map';
import {store} from '#src/store';

describe('<App />', ()=> {
  it('renders the map component', ()=> {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const map = wrapper.find(Map);

    expect(map.length).toBe(1);
  });
});
