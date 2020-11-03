import React, {
  useContext, useState, useRef, useCallback, useEffect,
} from 'react';
import { PropTypes } from 'prop-types';
import { UsersContext } from '../../stores/UserStore';
import { AuthContext } from '../../stores/AuthStore';
import { commentAPI } from '../../apis/api';

const styles = {
  header: {
    display: 'flex',
  },
  writer: {
    fontWeight: '800',
  },
  count: {
    display: 'none',
  },
};

const calElapsedTime = (createdAt) => {
  const createdTime = new Date(createdAt);

  const diff = Date.now() - createdTime.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  if (days >= 1) return `${Math.floor(days)} days`;
  if (hours >= 1) return `${Math.floor(hours)} hours`;
  if (minutes >= 1) return `${Math.floor(minutes)} minutes`;
  return `${Math.floor(seconds)} seconds`;
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

  const owner = currentUser.id === userId;
  const markOfOwner = () => {
    if (owner) return 'Owner';
    if (userId === issueAuthorId) return 'Author';
    return '';
  };

  const writer = users.length > 0 ? users.find((user) => user.id === userId) : ' ';
  const elapsedTime = updatedAt ? calElapsedTime(updatedAt) : calElapsedTime(createdAt);

  const editRef = useRef(null);
  const [editState, setEditState] = useState(false);

  const editClickEvent = useCallback(({ target }) => {
    const { current } = editRef;
    if (current && current.contains(target)) setEditState(!editState);
  }, [editState]);

  useEffect(() => {
    if (editState) window.addEventListener('click', editClickEvent);
    return () => window.removeEventListener('click', editClickEvent);
  }, [editState]);

  const originContent = content;
  const [newContent, setNewContent] = useState(content);
  const [countOfCharacter, setCountOfCharacter] = useState(newContent.length);
  const [recentTimeout, setRecentTimeout] = useState(-1);

  // TODO: 2초 뒤 사라지는 기능 미완
  const timeout = () => setTimeout(() => {
    styles.count.display = 'none';
  }, 2000);

  const handleContent = ({ target }) => {
    setNewContent(target.value);
    setCountOfCharacter(target.value.length);
    styles.count.display = 'block';
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
    return onClick();
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
              <div css={styles.count}>
                {countOfCharacter}
                {' '}
                characters
              </div>
              <div>Attach files by checking here.</div>
            </div>
            <div>
              <button type="button" ref={editRef} onClick={onClick}>Cancel</button>
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
              <div>
                {markOfOwner()}
              </div>
              {owner
                ? (<button type="button" ref={editRef} onClick={onClick}>Edit</button>)
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
