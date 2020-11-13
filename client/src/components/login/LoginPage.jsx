import React from 'react';
import { Redirect } from 'react-router-dom';

import LoginMain from './container/LoginMain';

export default function LoginPage() {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <LoginMain />
  );
}
