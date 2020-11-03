import React, { useRef } from 'react';
import { PropTypes } from 'prop-types';
import { issueAPI, commentAPI } from '../../apis/api';

const styles = {
  body: {
  },
  profile: {
  },
  layout: {
  },
  inputWrapper: {
  },
  statusButton: {
  },
  commentButton: {
  },
};

export default function NewComment({ user, issue }) {
  const inputRef = useRef(false);

  const createComment = async (e) => {
    e?.preventDefault();
    const content = inputRef.current.value;
    if (!content) return;

    const comment = await commentAPI.create({ issueId: issue.id, userId: user.id, content });
    // TODO : comment 목록 상태 업데이트 필요함
    // if (res) console.log(res);
  };

  const changeIssueStatus = async (e) => {
    e.preventDefault();
    await createComment();
    const result = await issueAPI.update({ id: issue.id, isClosed: !issue.isClosed });
    // TODO : issue 목록 상태 업데이트 필요함
    // if(result)
  };

  return (
    <div css={styles.body}>
      <div css={styles.profile} />
      <div css={styles.layout}>
        <div css={styles.inputWrapper}>
          <input type="text" ref={inputRef} />
          <button css={styles.statusButton} type="submit" onClick={changeIssueStatus}>
            {issue?.isClosed ? 'Reopen issue' : 'Close issue'}
          </button>
          <button css={styles.commentButton} type="submit" onClick={createComment}>
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

NewComment.propTypes = {
  user: PropTypes.shape.isRequired,
  issue: PropTypes.shape.isRequired,
};
