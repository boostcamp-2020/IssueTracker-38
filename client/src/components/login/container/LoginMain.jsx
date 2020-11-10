import React from 'react';
import DefaultButton from '../../issueDetail/presentational/DefaultButton';

const styles = {
  button: {
    position: 'absolute',
    top: '30%',
    left: '40%',
    width: '300px',
    height: '200px',
    fontSize: '30px',
    '&:hover': {
      backgroundColor: 'green',
    },
  }
};

export default function LoginMain() {
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.CLIENT_URL}/callback`;
  const clickLoginButton = () => {
    window.location.href = url;
  };

  return (
    <>
      <DefaultButton text="GitHub 로그인" onClick={clickLoginButton} extraStyle={styles.button} />
    </>
  );
}
