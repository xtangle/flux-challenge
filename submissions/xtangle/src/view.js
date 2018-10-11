import {
  button, div, h1, h3, h6, li, section, ul,
} from '@cycle/dom';
import { map } from 'rxjs/operators';

function planetMonitor(state) {
  return h1('.css-planet-monitor', state.planet ? `Obi-Wan currently on ${state.planet.name}` : '');
}

function slots(state) {
  return ul('.css-slots', state.rows.map(sith => li('.css-slot', sith
    ? [
      h3(sith.name),
      h6(`Homeworld: ${sith.homeworld.name}`),
    ]
    : [])));
}

function scrollButtons() {
  return div('.css-scroll-buttons', [
    button('.css-button-up'),
    button('.css-button-down'),
  ]);
}

export default function view(state$) {
  return state$.pipe(
    map(state => div('.css-root', [
      planetMonitor(state),
      section('.css-scrollable-list', [
        slots(state),
        scrollButtons(),
      ]),
    ])),
  );
}
