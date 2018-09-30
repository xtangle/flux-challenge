import * as Immutable from 'immutable';
import {merge} from 'rxjs';
import {map, scan, shareReplay} from 'rxjs/operators';

const initialState = Immutable.fromJS({
  planet: {
    name: ''
  },
  rows: [null, null, null, null, null]
});

function makeUpdate$(sources) {
  const updatePlanet$ = sources.SOCK.pipe(
    map((planet) => state => state.set('planet', planet))
  );

  return merge(updatePlanet$);
}

export function model(sources) {
  const update$ = makeUpdate$(sources);
  return update$.pipe(
    scan((state, update) => update(state), initialState),
    map(s => s.toJS()),
    shareReplay(1)
  );
}