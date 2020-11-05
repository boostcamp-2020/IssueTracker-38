import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  body: {
    margin: '20px 0 40px 0',
    display: 'flex',
  },
  profile: {
    width: '40px',
    height: '40px',
    backgroundColor: 'skyblue',
    borderRadius: '3px',
  },
  layout: {
    marginLeft: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '800px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px 6px 0 0',
  },
};

export default function CommentLayout({ children }) {
  return (
    <div css={styles.body}>
      <div css={styles.profile}>&nbsp;</div>
      <div css={styles.layout}>
        {children}
      </div>
    </div>
  );
}

CommentLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
