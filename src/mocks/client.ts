import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
global.console = {
    ...global.console,
    error: jest.fn(),
};
