import { SCROLL_SIZE } from './intent';

export function isMatch(sith, planet) {
  return sith && sith.homeworld.id === planet.id;
}

export function hasMatch(rows, planet) {
  return rows.some(sith => isMatch(sith, planet));
}

export function outOfBounds(position, rows) {
  return position < 0 || position >= rows.length;
}

export function shiftByDelta(rows, delta) {
  const amount = Math.abs(delta);
  const emptyRows = new Array(amount).fill(null);
  return (delta > 0)
    ? emptyRows.concat(rows.slice(0, rows.length - amount))
    : rows.slice(amount, rows.length).concat(emptyRows);
}

export function hasEnoughToScrollUp(rows) {
  return shiftByDelta(rows, SCROLL_SIZE).some(s => s);
}

export function hasEnoughToScrollDown(rows) {
  return shiftByDelta(rows, -SCROLL_SIZE).some(s => s);
}

export function firstSithHasMaster(rows) {
  const valids = rows.filter(s => s);
  const firstValid = valids[0];
  return firstValid && firstValid.master.id !== null;
}

export function lastSithHasApprentice(rows) {
  const valids = rows.filter(s => s);
  const lastValid = valids[valids.length - 1];
  return lastValid && lastValid.apprentice.id !== null;
}
