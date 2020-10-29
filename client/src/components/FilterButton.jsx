import React from 'react';

export default function filterButton() {
  const styles = {
    dropdown: {
      display: 'inline-block',
      width: '0',
      height: '0',
      verticalAlign: 'middle',
      content: '""',
      borderTopStyle: 'solid',
      borderTopWidth: '4px',
      borderRight: '4px solid transparent',
      borderBottom: '0 solid transparent',
      borderLeft: '4px solid transparent'
    },
    button: {
      fontSize: '16px',
      background: 'white',
      border: '1px solid lightgray',
      backgroundColor: '#efefef',
      borderRadius: '6px 0 0 6px',
      width: '100px'
    }
  };

  return (
    <button type="button" css={styles.button}>
      Filter
      <div css={styles.dropdown} />
    </button>
  );
}
