import React from 'react';
import { PropTypes } from 'prop-types';

const styles = {
  titleWrapper: {
    borderBottom: '1px solid #e1e4e8',
    backgroundColor: '#f6f8fa',
    width: '100%',
  },
};

export default function CommentTitleWrapper({
  children, backgroundColor = '#f6f8fa',
}) {
  return (
    <div css={{ ...styles.titleWrapper, backgroundColor }}>
      {children}
    </div>
  );
}

CommentTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
