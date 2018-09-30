import {makeDOMDriver} from '@cycle/dom';
import {WebSocketSubject} from 'rxjs/webSocket';

function makeWSDriver(url) {
  return () => new WebSocketSubject(url);
}

export const drivers = {
  DOM: makeDOMDriver('.app-container'),
  SOCK: makeWSDriver('ws://localhost:4000')
};
