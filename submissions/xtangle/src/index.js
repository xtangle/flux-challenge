import { run } from '@cycle/rxjs-run';
import main from './main';
import drivers from './drivers';

run(main, drivers);
