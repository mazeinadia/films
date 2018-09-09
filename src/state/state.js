let state = {
  films: [],
  deleted: [],
  added: []
};

export function getStete() {
  return state;
}

export function setState(propertyName, delta) {
  state = {
    ...state,
    propertyName: delta,
  };
}
