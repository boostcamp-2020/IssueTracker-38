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

export const calElapsedTime = (createdAt) => {
  const createdTime = new Date(createdAt);

  const diff = Date.now() - createdTime.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (days >= 1) return `${Math.floor(days)} days`;
  if (hours >= 1) return `${Math.floor(hours)} hours`;
  if (minutes >= 1) return `${Math.floor(minutes)} minutes`;
  return `${Math.floor(seconds)} seconds`;
};

export const getNicknameByEmail = (email) => email.split('@')[0];
export const getItemById = (items, id) => {
  const target = items.find((item) => item.id === id);
  return target;
};
