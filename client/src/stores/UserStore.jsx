import React, { useEffect, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import { userAPI } from '../apis/api';

export const UsersContext = React.createContext();
function userReducer(users, { type, payload }) {
  switch (type) {
    case 'INIT':
      return payload;
    case 'ADD':
      return [...users, payload];
    default:
      return users;
  }
}

export default function UserStore({ children }) {
  const [users, dispatch] = useReducer(userReducer, []);
  const setInitState = async () => {
    const initState = await userAPI.readAll();
    dispatch({ type: 'INIT', payload: initState });
  };
  useEffect(() => {
    setInitState();
  }, []);
  return (
    <UsersContext.Provider value={{ users, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

UserStore.propTypes = {
  children: PropTypes.node.isRequired,
};
