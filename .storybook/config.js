import { configure } from '@storybook/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '#scss/fonts.scss';

// eslint-disable-next-line no-undef
const req = require.context('#src', true, /stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

Enzyme.configure({ adapter: new Adapter() });
configure(loadStories, module);
