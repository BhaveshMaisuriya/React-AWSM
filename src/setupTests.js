// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
const nodeCrypto = require("crypto")
window.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer)
  },
}
// fix scrolling error during npm test
const noop = () => {}
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })