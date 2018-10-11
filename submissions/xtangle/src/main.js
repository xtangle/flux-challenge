import { ReplaySubject } from 'rxjs';
import model from './model';
import view from './view';
import http from './http';

export default function main(sources) {
  const planet$ = sources.SOCK;
  const proxyState$ = new ReplaySubject(1);

  const { sithRequest$, sithResponse$ } = http(sources.HTTP, proxyState$);
  const state$ = model(planet$, sithResponse$);
  const vdom$ = view(state$);
  state$.subscribe(proxyState$);

  return {
    HTTP: sithRequest$,
    DOM: vdom$,
  };
}
