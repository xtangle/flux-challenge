import {
  button, div, h1, h3, h6, li, section, ul,
} from '@cycle/dom';
import { map } from 'rxjs/operators';
import {
  firstSithHasMaster, hasEnoughToScrollUp, hasEnoughScrollDown, hasMatch, isMatch, lastSithHasApprentice,
} from './util';

function planetMonitor(state) {
  return h1('.css-planet-monitor', state.planet ? `Obi-Wan currently on ${state.planet.name}` : '');
}

function slots(state) {
  return ul('.css-slots', state.rows.map(sith => (sith
    ? li('.css-slot', { style: { color: isMatch(sith, state.planet) ? 'red' : null } }, [
      h3(sith.name),
      h6(`Homeworld: ${sith.homeworld.name}`),
    ])
    : li('.css-slot'))));
}

function scrollButtons(state) {
  const canScrollUp = !hasMatch(state) && hasEnoughToScrollUp(state) && firstSithHasMaster(state);
  const canScrollDown = !hasMatch(state) && hasEnoughScrollDown(state) && lastSithHasApprentice(state);
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
