export function hasMatch(state) {
  return state.rows.some(sith => sith && sith.matched);
}

export function withinBounds(position, rows) {
  return position >= 0 && position < rows.length;
}



export function firstSithHasMaster(state) {
  const valids = state.rows.filter(s => s);
  const firstValid = valids[0];
  return firstValid && firstValid.master.id !== null;
}

export function lastSithHasApprentice(state) {
  const valids = state.rows.filter(s => s);
  const lastValid = valids[valids.length - 1];
  return lastValid && lastValid.apprentice.id !== null;
}
