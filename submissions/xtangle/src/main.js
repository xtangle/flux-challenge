import {model} from './model';
import {view} from './view';

export function main(sources) {
  const state$ = model(sources);
  const vdom$ = view(state$);

  return {
    DOM: vdom$,
    SOCK: sources.SOCK
  };
}
