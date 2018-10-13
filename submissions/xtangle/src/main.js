import { Subject } from 'rxjs';
import model from './model';
import view from './view';
import http from './http';
import intent from './intent';

export default function main(sources) {
  const planet$ = sources.SOCK;
  const proxyState$ = new Subject();

  const { sithRequest$, sithResponse$ } = http(sources.HTTP, proxyState$);
  const actions$ = intent(sources.DOM);
  const state$ = model(planet$, sithResponse$, actions$);
  const vdom$ = view(state$);
  state$.subscribe(proxyState$);

  state$.subscribe(state => console.log('>>>', state));

  return {
    HTTP: sithRequest$,
    DOM: vdom$,
  };
}
