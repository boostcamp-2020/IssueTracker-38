import { useState } from 'react';

export const useSwitch = (initialBool) => {
  const [state, toggleState] = useState(false);

  const onClick = () => {
    toggleState(!state);
  };

  return [state, onClick];
};
