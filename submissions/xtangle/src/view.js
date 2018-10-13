import {
  button, div, h1, h3, h6, li, section, ul,
} from '@cycle/dom';
import { map } from 'rxjs/operators';
import { firstSithHasMaster, hasMatch, lastSithHasApprentice } from './util';

function planetMonitor(state) {
  return h1('.css-planet-monitor', state.planet ? `Obi-Wan currently on ${state.planet.name}` : '');
}

function slots(state) {
  return ul('.css-slots', state.rows.map(sith => (sith
    ? li('.css-slot', { style: { color: sith.matched ? 'red' : null } }, [
      h3(sith.name),
      h6(`Homeworld: ${sith.homeworld.name}`),
    ])
    : li('.css-slot'))));
}

function canScrollUp(state) {
  const sithsWithPosition = state.rows
    .map((sith, position) => ({ sith, position }))
    .filter(sithWithPosition => sithWithPosition.sith !== null);
}

function scrollButtons(state) {
  const upBtnDisabled = hasMatch(state) || !firstSithHasMaster(state);
  const downBtnDisabled = hasMatch(state) || !lastSithHasApprentice(state);
  const upBtnStyle = upBtnDisabled ? '.css-button-disabled' : '';
  const downBtnStyle = downBtnDisabled ? '.css-button-disabled' : '';

  return div('.css-scroll-buttons', [
    button(`.scroll-up.css-button-up${upBtnStyle}`, { attrs: { disabled: upBtnDisabled } }),
    button(`.scroll-down.css-button-down${downBtnStyle}`, { attrs: { disabled: downBtnDisabled } }),
  ]);
}

export default function view(state$) {
  return state$.pipe(
    map(state => div('.css-root', [
      planetMonitor(state),
      section('.css-scrollable-list', [
        slots(state),
        scrollButtons(state),
      ]),
    ])),
  );
}
