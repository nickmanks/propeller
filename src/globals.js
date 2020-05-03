import 'whatwg-fetch';

export const fetch = window.fetch;
export const localStorage = window.localStorage;
export const sessionStorage = window.sessionStorage;
export const location = window.location;
export const document = window.document;
export const history = window.history;
export const navigator = window.navigator;
export const URL = window.URL;
export const screen = window.screen;
const win = window;
export {win as window};
