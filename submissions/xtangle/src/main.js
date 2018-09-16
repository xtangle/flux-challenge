import {div, h1} from '@cycle/dom';

export function main(sources) {
  const planet$ = sources.SOCK
    .map(response => JSON.parse(response.data));

  const planetMonitor = planet =>
    h1('.css-planet-monitor',
      planet ? `Obi-Wan currently on ${planet.name}` : ''
    );

  const vdom$ = planet$.map(planet =>
    div('.css-root', [
      planetMonitor(planet)
    ])
  );

  return {
    DOM: vdom$,
    SOCK: sources.SOCK
  };
}
