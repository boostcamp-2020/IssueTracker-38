export const updateStoreItem = (prevState, payload) => {
  const nextState = [...prevState];
  const targetIndex = nextState.findIndex((v) => v.id === payload.id);
  nextState[targetIndex] = payload;

  return nextState;
};

export const deleteStoreItem = (prevState, payload) => {
  const nextState = prevState.filter((v) => v.id !== payload.id);

  return nextState;
};
