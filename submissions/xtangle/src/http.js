import { of, identity, merge } from 'rxjs';
import {
  distinctUntilChanged, filter, map, mapTo, pluck, switchMap,
} from 'rxjs/operators';
import { hasMatch } from './util';

const API_PATH = 'http://localhost:3000/dark-jedis';

function idBeingFetched(state) {
  return state.fetching ? state.fetching.id : null;
}

export default function http(httpSource$, state$) {
  const sithRequest$ = state$.pipe(
    distinctUntilChanged((s1, s2) => idBeingFetched(s1) === idBeingFetched(s2)),
    filter(state => state.fetching && !hasMatch(state.rows, state.planet)),
    map(state => ({
      url: `${API_PATH}/${state.fetching.id}`,
      lazy: true,
    })),
  );

  const sithResponse$ = merge(
    httpSource$.select(),
    state$.pipe(filter(state => hasMatch(state.rows, state.planet)), mapTo(of(null))),
  ).pipe(
    switchMap(identity),
    filter(identity),
    pluck('body'),
  );

  return { sithRequest$, sithResponse$ };
}
