import { button, div, h1, h3, h6, li, section, ul } from '@cycle/dom';
import { map } from 'rxjs/operators';
import {
  firstSithHasMaster,
  hasEnoughScrollDown,
  hasEnoughToScrollUp,
  hasMatch,
  isMatch,
  lastSithHasApprentice,
} from './util';

function planetMonitor(state) {
  return h1('.css-planet-monitor', state.planet ? `Obi-Wan currently on ${state.planet.name}` : '');
}

function slots(state) {
  return ul('.css-slots', state.rows.map(
    sith => li('.css-slot', { style: { color: isMatch(sith, state.planet) ? 'red' : null } },
      sith ? [
        h3(sith.name),
        h6(`Homeworld: ${sith.homeworld.name}`),
      ] : []),
  ));
}

function scrollButtons(state) {
  const matched = hasMatch(state.rows, state.planet);
  const canScrollUp = !matched && hasEnoughToScrollUp(state.rows) && firstSithHasMaster(state.rows);
  const canScrollDown = !matched && hasEnoughScrollDown(state.rows) && lastSithHasApprentice(state.rows);
  const upBtnStyle = canScrollUp ? '' : '.css-button-disabled';
  const downBtnStyle = canScrollDown ? '' : '.css-button-disabled';

  return div('.css-scroll-buttons', [
    button(`.scroll-up.css-button-up${upBtnStyle}`, { attrs: { disabled: !canScrollUp } }),
    button(`.scroll-down.css-button-down${downBtnStyle}`, { attrs: { disabled: !canScrollDown } }),
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
