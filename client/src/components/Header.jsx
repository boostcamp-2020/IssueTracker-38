import React from 'react';

export default function header() {
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
    },
  };

  return (
    <header css={styles.header}>
      <p css={styles.title}>ISSUES</p>
    </header>
  );
}
