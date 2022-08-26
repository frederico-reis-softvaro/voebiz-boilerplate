import "@testing-library/jest-dom";
import "jest-canvas-mock";

const scroll = jest.fn();
const smlsEnv = {
  includes: jest.fn(),
  toLocaleUpperCase: jest.fn(),
};

export const localStorageMock = (() => {
  let store: {
    [key: string]: unknown;
  } = {};
  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string | number) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.assign(global.window, {
  ...window,
  scroll,
  smlsEnv,
  localStorage: localStorageMock,
  sessionStorage: localStorageMock,
});
