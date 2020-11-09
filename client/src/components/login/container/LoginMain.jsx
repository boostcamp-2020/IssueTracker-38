import React from 'react';
import DefaultButton from '../../issueDetail/presentational/DefaultButton';

const styles = {};

export default function LoginMain() {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.CLIENT_URL}/callback`;
  const clickLoginButton = () => {
    window.location.href = url;
  };

  return (
    <DefaultButton text="GitHub으로 로그인 하기" onClick={clickLoginButton} extraStyle={styles} />
  );
}
