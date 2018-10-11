import { makeDOMDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { WebSocketSubject } from 'rxjs/webSocket';

function makeWSDriver(url) {
  return () => new WebSocketSubject(url);
}

export default {
  DOM: makeDOMDriver('.app-container'),
  HTTP: makeHTTPDriver(),
  SOCK: makeWSDriver('ws://localhost:4000'),
};
