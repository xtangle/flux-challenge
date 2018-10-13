import { merge } from 'rxjs';
import { map, scan, share } from 'rxjs/operators';
import { hasMatch, outOfBounds, shiftByDelta } from './util';

const NUM_ROWS = 5;
const DARTH_SIDIOUS_ID = 3616;

const initialState = {
  planet: null,
  rows: new Array(NUM_ROWS).fill(null),
  fetchInfo: {
    id: DARTH_SIDIOUS_ID,
    position: Math.floor(NUM_ROWS / 2),
  },
};

function getRowToPopulate(rows) {
  const apprentices = rows.map((sith, i) => (sith ? { id: sith.apprentice.id, position: i + 1 } : null));
  const masters = rows.map((sith, i) => (sith ? { id: sith.master.id, position: i - 1 } : null));
  return [...apprentices, ...masters]
    .filter(fetchInfo => fetchInfo && fetchInfo.id !== null
      && !outOfBounds(fetchInfo.position, rows)
      && rows[fetchInfo.position] === null)
    .shift() || null;
}

function makeUpdate$(planet$, sithResponse$, actions$) {
  const updateWithPlanet$ = planet$.pipe(
    map(planet => (state) => {
      const fetchInfo = hasMatch(state.rows, planet) ? null : (state.fetchInfo || getRowToPopulate(state.rows));
      return { ...state, planet, fetchInfo };
    }),
  );

  const updateWithSithResponse$ = sithResponse$.pipe(
    map(sith => (state) => {
      const rows = Object.values({ ...state.rows, [state.fetchInfo.position]: sith });
      const fetchInfo = hasMatch(rows, state.planet) ? null : getRowToPopulate(rows);
      return { ...state, rows, fetchInfo };
    }),
  );

  const updateWithScrollAction$ = actions$.scroll$.pipe(
    map(delta => (state) => {
      const rows = shiftByDelta(state.rows, delta);
      const fetchInfo = (state.fetchInfo && !outOfBounds(state.fetchInfo.position + delta, rows))
        ? { ...state.fetchInfo, position: state.fetchInfo.position + delta }
        : getRowToPopulate(rows);
      return { ...state, rows, fetchInfo };
    }),
  );

  return merge(updateWithPlanet$, updateWithSithResponse$, updateWithScrollAction$);
}

export default function model(planet$, sithResponse$, actions$) {
  const update$ = makeUpdate$(planet$, sithResponse$, actions$);
  return update$.pipe(
    scan((state, update) => update(state), initialState),
    share(),
  );
}
