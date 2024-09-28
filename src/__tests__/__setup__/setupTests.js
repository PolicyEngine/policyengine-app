import '@testing-library/jest-dom';

import { createCanvas } from 'canvas';

Object.defineProperty(window.HTMLCanvasElement.prototype, 'getContext', {
  value: function () {
    return createCanvas().getContext('2d');
  },
});

// Mock window.scrollTo
global.window.scrollTo = jest.fn();

// Add any other global mocks or setup here