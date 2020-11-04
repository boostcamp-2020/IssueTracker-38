import { useState } from 'react';

export const useInput = (initialValue) => {
  const [input, setInput] = useState(initialValue);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return [input, onChange];
};

export const useSwitch = (initialBool) => {
  const [state, toggleState] = useState(initialBool);

  const onClick = () => {
    toggleState(!state);
  };

  return [state, onClick];
};
