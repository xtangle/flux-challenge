import { merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export const SCROLL_SIZE = 2;

export default function intent(DOM) {
  return {
    scroll$: merge(
      DOM.select('.scroll-up').events('click').pipe(mapTo(SCROLL_SIZE)),
      DOM.select('.scroll-down').events('click').pipe(mapTo(-SCROLL_SIZE)),
    ),
  };
}
