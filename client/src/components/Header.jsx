import React from 'react';

const styles = {
  header: {
    height: '100px',
    backgroundColor: 'black',
    textAlign: 'center',
    margin: '0',
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
      <a css={styles.title} href="/">ISSUES</a>
    </header>
  );
}
