import { merge } from 'rxjs';
import { map, scan, shareReplay } from 'rxjs/operators';

const initialState = {
  planet: null,
  rows: [null, null, null, null, null],
};

function makeUpdate$(planet$, sithResponse$) {
  const updateWithPlanet$ = planet$.pipe(
    map(planet => state => ({ ...state, planet })),
  );

  const updateWithSithResponse$ = sithResponse$.pipe(
    map(sith => (state) => {
      const rowToPopulate = state.rows.every(row => row === null)
        ? Math.floor(state.rows.length / 2)
        : state.rows.findIndex((row, i) => !row && (
          (state.rows[i - 1] && state.rows[i - 1].apprentice.id === sith.id)
          || (state.rows[i + 1] && state.rows[i + 1].master.id === sith.id)
        ));
      return { ...state, rows: Object.values({ ...state.rows, [rowToPopulate]: sith }) };
    }),
  );

  return merge(updateWithPlanet$, updateWithSithResponse$);
}

export default function model(planet$, sithResponse$) {
  const update$ = makeUpdate$(planet$, sithResponse$);
  return update$.pipe(
    scan((state, update) => update(state), initialState),
    shareReplay(1),
  );
}
