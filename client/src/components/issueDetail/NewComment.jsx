import React, { useContext, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { issueAPI, commentAPI } from '../../apis/api';
import { IssuesContext } from '../../stores/IssueStore';

const styles = {
  body: {
    marginTop: '10px',
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
  inputTitle: {
    borderBottom: '1px solid #e1e4e8',
    backgroundColor: '#f6f8fa',
    width: '100%',
  },
  titleContent: {
    backgroundColor: 'white',
    width: '60px',
    margin: '10px 10px -1px 10px',
    padding: '5px 0',
    textAlign: 'center',
    border: '1px solid #e1e4e8',
    borderRadius: '6px 6px 0 0',
    borderBottom: '0',
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    boxShadow: '0px 0px 5px #e1e4e8',
    width: '100%',
    height: '200px',
    margin: '20px 10px 10px 10px',
    '&:focus': {
      backgroundColor: '#f6f8fa',
      outline: 'none',
    },
  },
  statusButton: {
    margin: '0 10px 10px auto',
    padding: '5px 16px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontWeight: '600',
  },
  commentButton: {
    backgroundColor: '#94d3a2', // #2ea44f
    color: 'white',
    padding: '5px 16px',
    margin: '0 10px 10px 10px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontWeight: '600',
  },
};

export default function NewComment({ user, issue, addComment }) {
  const { dispatch } = useContext(IssuesContext);
  const inputRef = useRef(false);

  const createComment = async (e) => {
    e?.preventDefault();

    const content = inputRef.current.value;
    if (!content) return;

    const comment = await commentAPI.create({ issueId: issue.id, userId: user.id, content });
    if (!comment) return;
    addComment(comment);
  };

  const changeIssueStatus = async (e) => {
    e.preventDefault();

    await createComment();
    const result = await issueAPI.update({ id: issue.id, isClosed: !issue.isClosed });

    if (!result) return;
    const updated = { ...issue, isClosed: !issue.isClosed };
    dispatch({ type: 'UPDATE', payload: updated });
  };

  return (
    <div css={styles.body}>
      <div css={styles.profile}>
        &nbsp;
      </div>
      <div css={styles.layout}>
        <div css={styles.inputTitle}>
          <p css={styles.titleContent}>Write</p>
        </div>
        <div css={styles.inputWrapper}>
          <textarea css={styles.input} ref={inputRef} placeholder="Leave a Comment" />
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
  addComment: PropTypes.func.isRequired,
};
