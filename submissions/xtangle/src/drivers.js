import {makeDOMDriver} from '@cycle/dom';
import xs from 'xstream';
import {adapt} from '@cycle/run/lib/adapt';

function makeWSDriver(url) {
  const connection = new WebSocket(url);
  const source$ = xs.create({
    start: listener => {
      connection.onerror = (err) => {
        listener.error(err);
      };
      connection.onmessage = (msg) => {
        console.log('On planet: ' + msg.data);
        listener.next(msg);
      };
    },
    stop: () => {
      connection.close();
    }
  });

  return () => adapt(source$);
}

export const drivers = {
  DOM: makeDOMDriver('.app-container'),
  SOCK: makeWSDriver('ws://localhost:4000')
};
