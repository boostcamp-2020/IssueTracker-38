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
      borderLeft: '4px solid transparent',
    },
  };

  return (
    <button type="button" onClick={() => alert('hello!')}>
      Filter
      <div css={styles.dropdown} />
    </button>
  );
}
