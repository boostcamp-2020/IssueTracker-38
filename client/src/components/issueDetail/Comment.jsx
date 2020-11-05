import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { UsersContext } from '../../stores/UserStore';
import { AuthContext } from '../../stores/AuthStore';
import { commentAPI } from '../../apis/api';
import { calElapsedTime, getItemById } from '../../utils/utils';
import EditComment from './EditComment';
import commonStyles from './commonStyles';

const styles = {
  commentTitle: {
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
  ownerMark: {
    marginLeft: 'auto',
    padding: '2px 5px',
    color: '#6a737d',
    border: '2px solid #e1e4e8',
    borderRadius: '6px',
  },
  editButton: {
    fontSize: '15px',
    margin: 'auto 0 auto 10px',
    color: '#6a737d',
    backgroundColor: 'transparent',
    border: 'none',
  },
};

export default function Comment({
  id,
  content,
  userId,
  createdAt,
  updatedAt,
  issueAuthorId,
  updateComment,
}) {
  const { users } = useContext(UsersContext);
  const { currentUser } = useContext(AuthContext);
  const [editState, setEditState] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const writer = getItemById(users, +userId);
  const elapsedTime = updatedAt ? calElapsedTime(updatedAt) : calElapsedTime(createdAt);
  const owner = currentUser.id === userId;

  const markOfOwner = () => {
    if (owner) return 'Owner';
    if (userId === issueAuthorId) return 'Author';
    return 'Member';
  };

  const onClick = () => {
    setEditState(!editState);
  };

  const triggerUpdate = async () => {
    const result = await commentAPI.update({ id, content: newContent });
    if (!result) return;
    updateComment(id, newContent);
    setEditState(!editState);
  };

  return (
    <>
      {editState
        ? (
          <EditComment newContent={newContent} setNewContent={setNewContent}>
            <button css={commonStyles.basicButton} type="button" onClick={onClick}>Cancel</button>
            <button css={commonStyles.commentButton} type="button" onClick={updateComment}>Update Comment</button>
          </EditComment>
        )
        : (
          <div css={commonStyles.body}>
            <div css={commonStyles.profile}>
              &nbsp;
            </div>
            <div css={commonStyles.layout}>
              <div css={{ ...commonStyles.title, backgroundColor: owner ? '#f1f8ff' : '#f6f8fa' }}>
                <div css={styles.commentTitle}>
                  <div css={styles.nickname}>
                    {writer?.email}
                    {' '}
                  </div>
                  <div css={styles.description}>
                    commented
                    {' '}
                    {elapsedTime}
                    {' '}
                    ago
                    {' '}
                  </div>
                  <div css={styles.ownerMark}>
                    {markOfOwner()}
                  </div>
                  {owner
                    ? (<button css={styles.editButton} type="button" onClick={onClick}>Edit</button>)
                    : (<></>)}
                </div>
              </div>
              <div css={commonStyles.contentWrapper}>
                <div css={commonStyles.content}>{content}</div>
              </div>
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
  updateComment: PropTypes.func.isRequired,
};
