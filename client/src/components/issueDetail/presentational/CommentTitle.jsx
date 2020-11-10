import React from 'react';
import { PropTypes } from 'prop-types';
import TextButton from './TextButton';

const styles = {
  title: {
    display: 'flex',
    margin: '5px 10px',
  },
  nickname: {
    margin: 'auto 0',
    fontWeight: '600',
  },
  description: {
    margin: 'auto 5px',
    color: '#6a737d',
  },
  mark: {
    marginLeft: 'auto',
    padding: '2px 5px',
    color: '#6a737d',
    border: '2px solid #e1e4e8',
    borderRadius: '6px',
  },
};

export default function CommentTitle({
  nickname, elapsedTime, mark, isOwner, editClickHandler,
}) {
  return (
    <div css={styles.title}>
      <div css={styles.nickname}>
        {nickname}
      </div>
      <div css={styles.description}>
        commented
        {' '}
        {elapsedTime}
        {' '}
        ago
      </div>
      <div css={styles.mark}>
        {mark}
      </div>
      {isOwner
        ? (<TextButton text="Edit" onClick={editClickHandler} />)
        : (<></>)}
    </div>
  );
}

CommentTitle.propTypes = {
  nickname: PropTypes.string.isRequired,
  elapsedTime: PropTypes.string.isRequired,
  mark: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  editClickHandler: PropTypes.func.isRequired,
};
