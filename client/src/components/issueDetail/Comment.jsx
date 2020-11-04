import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { UsersContext } from '../../stores/UserStore';
import { AuthContext } from '../../stores/AuthStore';
import { commentAPI } from '../../apis/api';
import { calElapsedTime } from '../../utils/utils';
import CountOfCharacter from './CountOfCharacter';

const styles = {
  header: {
    display: 'flex',
  },
  writer: {
    fontWeight: '800',
  },
  role: {
    margin: '0 5px',
  },
};

export default function Comment({
  id,
  content,
  userId,
  createdAt,
  updatedAt,
  issueAuthorId,
}) {
  const { users } = useContext(UsersContext);
  const { currentUser } = useContext(AuthContext);
  const [editState, setEditState] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [countOfCharacter, setCountOfCharacter] = useState(newContent.length);
  const [recentTimeout, setRecentTimeout] = useState(-1);
  const [displayState, setDisplayState] = useState(false);

  const writer = users.length > 0 ? users.find((user) => user.id === userId) : ' ';
  const elapsedTime = updatedAt ? calElapsedTime(updatedAt) : calElapsedTime(createdAt);
  const originContent = content;
  const owner = currentUser.id === userId;

  const markOfOwner = () => {
    if (owner) return 'Owner';
    if (userId === issueAuthorId) return 'Author';
    return 'Member';
  };

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

  const onClick = () => {
    setEditState(!editState);
    setNewContent(originContent);
    setCountOfCharacter(originContent.length);
  };

  const updateComment = async () => {
    // TODO : 구현된 commentAPI.update()와 연결하기
    if (!commentAPI.update) return alert('Comment update is not function');

    const result = await commentAPI.update({ id, content: newContent });
    if (!result) return alert('Comment update is fail');
    return setEditState(!editState);
  };

  return (
    <>
      {editState
        ? (
          <div>
            <div>
              <div>Write</div>
            </div>
            <div>
              <textarea value={newContent} onChange={handleContent} />
              <div>Attach files by checking here.</div>
              <CountOfCharacter displayState={displayState} count={countOfCharacter} />
            </div>
            <div>
              <button type="button" onClick={onClick}>Cancel</button>
              <button type="button" onClick={updateComment}>Update Comment</button>
            </div>
          </div>
        )
        : (
          <div>
            <div css={styles.header}>
              <div>
                Profile Image
              </div>
              <div css={styles.writer}>
                {writer.email}
                {' '}
              </div>
              <div>
                commented
                {' '}
                {elapsedTime}
                {' '}
                ago
                {' '}
              </div>
              <div css={styles.role}>
                {markOfOwner()}
              </div>
              {owner
                ? (<button type="button" onClick={onClick}>Edit</button>)
                : (<></>)}
            </div>
            <div>
              <div>{content}</div>
            </div>
          </div>
        )}
    </>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  issueAuthorId: PropTypes.number.isRequired,
};
