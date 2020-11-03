import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

export const AuthContext = React.createContext();

export default function AuthStore({ children }) {
  const [currentUser, setUser] = useState({ id: 2, email: 'boostcamp@test.com' });

  return (
    <AuthContext.Provider value={{ currentUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthStore.propTypes = {
  children: PropTypes.node.isRequired,
};
