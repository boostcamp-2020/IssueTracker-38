import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import CountOfCharacter from '../presentational/CountOfCharacter';
import CommentLayout from '../presentational/CommentLayout';
import CommentTitleWrapper from '../presentational/CommentTitleWrapper';
import CommentContentWrapper from '../presentational/CommentContentWrapper';
import styles from '../layouts/EditComment'

export default function EditComment({ children, newContent, setNewContent }) {
  const [countOfCharacter, setCountOfCharacter] = useState(newContent ?.length || 0);
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
    <CommentLayout>
      <CommentTitleWrapper>
        <p css={styles.editTitle}>Write</p>
      </CommentTitleWrapper>
      <CommentContentWrapper>
        <textarea css={styles.textInput} value={newContent} placeholder="Leave a Comment" onChange={handleContent} />
        {/* <div>Attach files by checking here.</div> */}
        <CountOfCharacter displayState={displayState} count={countOfCharacter} />
        {children}
      </CommentContentWrapper>
    </CommentLayout>
  );
}

EditComment.propTypes = {
  children: PropTypes.node.isRequired,
  newContent: PropTypes.string.isRequired,
  setNewContent: PropTypes.func.isRequired,
};
