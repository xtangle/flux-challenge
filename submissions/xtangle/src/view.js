import {div, h1} from '@cycle/dom';
import {map} from 'rxjs/operators';

function planetMonitor(state) {
  return h1('.css-planet-monitor', `Obi-Wan currently on ${state.planet.name}`);
}

export function view(state$) {
  return state$.pipe(
    map(state =>
      div('.css-root', [
        planetMonitor(state)
      ])
    )
  );
}
