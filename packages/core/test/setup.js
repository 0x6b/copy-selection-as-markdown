// Polyfill for TextEncoder/TextDecoder in jsdom
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });

// Mock browser API for tests
global.browser = {
  storage: {
    local: {
      get: () => Promise.resolve({}),
      set: () => Promise.resolve()
    }
  }
};