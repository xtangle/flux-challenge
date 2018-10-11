import { identity, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const API_PATH = 'http://localhost:3000/dark-jedis';
const DARTH_SIDIOUS_ID = 3616;

const initialRequest = {
  url: `${API_PATH}/${DARTH_SIDIOUS_ID}`,
};

export default function http(httpSource$) {
  const sithRequest$ = of(initialRequest);

  const sithResponse$ = httpSource$.select().pipe(
    switchMap(identity),
    map(response => response.body),
  );

  return { sithRequest$, sithResponse$ };
}
