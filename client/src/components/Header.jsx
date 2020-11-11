import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './login/container/Logout';

const styles = {
  header: {
    height: '100px',
    backgroundColor: 'black',
    textAlign: 'center',
    margin: '0',
    posion: 'relative',
  },
  title: {
    padding: '0',
    lineHeight: '100px',
    color: 'white',
    fontSize: '25px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

export default function header() {
  return (
    <header css={styles.header}>
      <Link to="/" style={styles.title}>ISSUES</Link>
      <Logout />
    </header>
  );
}
