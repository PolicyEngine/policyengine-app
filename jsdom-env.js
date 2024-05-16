// ./jsdom-env.js
import JSDOMEnvironment from "jest-environment-jsdom";

export default class FixJSDOMEnvironment extends JSDOMEnvironment {
  constructor(...args) {
    super(...args);
    this.global.fetch = fetch;
    this.global.Request = Request;
    this.global.Response = Response;
    // And any other missing globals
  }
}
