import React from 'react';
import LoginMain from './container/LoginMain';

import { Redirect } from 'react-router-dom';

export default function LoginPage() {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return <Redirect to='/' />
  }

  return (
    <LoginMain />
  );
}
