import '@testing-library/jest-dom';

import { createCanvas } from 'canvas';

Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  value: function () {
    return createCanvas().getContext('2d');
  },
});

// Mock window.scrollTo
global.window.scrollTo = jest.fn();

// Mock the cookie consent popup
global.window.HTMLDivElement.prototype.scrollIntoView = jest.fn();

// Mock a function to automatically accept the cookie
jest.mock('../../modals/CookieConsent', () => () => null);

global.URL.createObjectURL = jest.fn();