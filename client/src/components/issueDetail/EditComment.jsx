import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import commonStyles from './commonStyles';
import CountOfCharacter from './CountOfCharacter';

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
  textInput: {
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    boxShadow: '0px 0px 5px #e1e4e8',
    width: '100%',
    height: '150px',
    margin: '20px 10px 10px 10px',
    padding: '10px',
    '&:focus': {
      backgroundColor: '#f6f8fa',
      outline: 'none',
    },
  },
};

export default function EditComment({ children, newContent, setNewContent }) {
  const [countOfCharacter, setCountOfCharacter] = useState(newContent?.length || 0);
  const [recentTimeout, setRecentTimeout] = useState(-1);
  const [displayState, setDisplayState] = useState(false);

  const timeout = () => setTimeout(() => {
    setDisplayState(false);
  }, 2000);

  const handleContent = ({ target }) => {
    setNewContent(target.value);
    setCountOfCharacter(target.value.length);
    setDisplayState(true);
    if (recentTimeout > 0) clearTimeout(recentTimeout);
    setRecentTimeout(timeout());
  };

  return (
    <div css={commonStyles.body}>
      <div css={commonStyles.profile}>
        &nbsp;
      </div>
      <div css={commonStyles.layout}>
        <div css={commonStyles.title}>
          <p css={styles.editTitle}>Write</p>
        </div>
        <div css={{ ...commonStyles.contentWrapper, position: 'relative' }}>
          <textarea css={styles.textInput} value={newContent} placeholder="Leave a Comment" onChange={handleContent} />
          {/* <div>Attach files by checking here.</div> */}
          <CountOfCharacter displayState={displayState} count={countOfCharacter} />
          {children}
        </div>
      </div>
    </div>
  );
}

EditComment.propTypes = {
  children: PropTypes.node.isRequired,
  newContent: PropTypes.string.isRequired,
  setNewContent: PropTypes.func.isRequired,
};
