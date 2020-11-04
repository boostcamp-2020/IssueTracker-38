import React from 'react';
import { PropTypes } from 'prop-types';
import commonStyles from './commonStyles';

const styles = {
  editTitle: {
    backgroundColor: 'white',
    width: '60px',
    margin: '10px 10px -1px 10px',
    padding: '5px 0',
    textAlign: 'center',
    border: '1px solid #e1e4e8',
    borderRadius: '6px 6px 0 0',
    borderBottom: '0',
  },
};

export default function EditComment({ children }) {
  return (
    <div css={commonStyles.body}>
      <div css={commonStyles.profile}>
        &nbsp;
      </div>
      <div css={commonStyles.layout}>
        <div css={commonStyles.title}>
          <p css={styles.editTitle}>Write</p>
        </div>
        <div css={commonStyles.contentWrapper}>
          {children}
        </div>
      </div>
    </div>
  );
}

EditComment.propTypes = {
  children: PropTypes.node.isRequired,
};
