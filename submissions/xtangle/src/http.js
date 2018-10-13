import { of, identity, merge } from 'rxjs';
import {
  distinct, filter, map, mapTo, pluck, switchMap,
} from 'rxjs/operators';
import { hasMatch } from './util';

const API_PATH = 'http://localhost:3000/dark-jedis';

export default function http(httpSource$, state$) {
  const sithRequest$ = state$.pipe(
    distinct(state => state.fetchInfo),
    filter(state => state.fetchInfo && !hasMatch(state)),
    map(state => ({
      url: `${API_PATH}/${state.fetchInfo.id}`,
      lazy: true,
    })),
  );

  const sithResponse$ = merge(
    httpSource$.select(),
    state$.pipe(filter(hasMatch), mapTo(of(null))),
  ).pipe(
    switchMap(identity),
    filter(identity),
    pluck('body'),
  );

  return { sithRequest$, sithResponse$ };
}
