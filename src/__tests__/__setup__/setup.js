import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from "util";

// Globalize TextDecoder & TextEncoder
Object.assign(global, { TextDecoder, TextEncoder });

// Mock window.URL.createObjectURL
if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = jest.fn();
}

// Mock react-plotly.js
jest.mock('react-plotly.js', () => ({
  __esModule: true,
  default: () => null,
}));

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Mock PolicyEngine
jest.mock('../../PolicyEngine', () => {
  return require('../__mocks__/PolicyEngine').default;
});