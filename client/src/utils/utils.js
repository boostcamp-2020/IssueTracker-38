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

export const getNicknameByEmail = (email) => email.split('@')[0];
export const getItemById = (items, id) => {
  const target = items.find((item) => item.id === id);
  return target || {};
};
