import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    padding: '10px',
  },
};

export default function CommentContentWrapper({ children }) {
  return (
    <div css={{ ...styles.wrapper }}>
      {children}
    </div>
  );
}

CommentContentWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
