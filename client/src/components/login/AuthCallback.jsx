import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { oauthAPI } from '../../apis/api';

export default function AuthCallback() {
  const getAccessToken = async (code) => {
    const { accessToken, id, nickname } = await oauthAPI.getAccessToken(code);

    if (!accessToken) {
      alert('무언가 단단히 잘못됐음');
      return;
    }

    window.localStorage.setItem('accessToken', accessToken);
    window.localStorage.setItem('userInfomation', JSON.stringify({ id, nickname }));
  };

  const query = new URLSearchParams(useLocation().search);

  useEffect(() => {
    getAccessToken(query.get('code'));
  }, []);

  return <div />;
}
