import React, { useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
import { UsersContext } from '../../../stores/UserStore';
import { commentAPI } from '../../../apis/api';
import { calElapsedTime, getItemById } from '../../../utils/utils';
import CommentLayout from '../presentational/CommentLayout';
import CommentTitleWrapper from '../layouts/CommentTitleWrapper';
import CommentTitle from '../presentational/CommentTitle';
import CommentContentWrapper from '../layouts/CommentContentWrapper';
import EditComment from './EditComment';
import DefaultButtom from '../presentational/DefaultButton';
import SubmitButton from '../presentational/SubmitButton';

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
  const currentUser = JSON.parse(localStorage.getItem('userInfo'));
  const [editState, setEditState] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const writerNickname = getItemById(users, +userId)?.nickname;
  const elapsedTime = updatedAt ? calElapsedTime(updatedAt) : calElapsedTime(createdAt);
  const owner = currentUser.id === userId;

  const markOfOwner = () => {
    if (owner) return 'Owner';
    if (userId === issueAuthorId) return 'Author';
    return 'Member';
  };

  const onClick = () => {
    setEditState(!editState);
    setNewContent(content);
  };

  const triggerUpdate = async () => {
    const result = await commentAPI.update({ id, content: newContent });
    if (!result) return;
    updateComment(id, newContent);
    setEditState(!editState);
    setNewContent(newContent);
  };

  return (
    <>
      {editState
        ? (
          <EditComment newContent={newContent} setNewContent={setNewContent}>
            <DefaultButtom text="Cancel" onClick={onClick} />
            <SubmitButton text="Update Comment" onClick={triggerUpdate} />
          </EditComment>
        )
        : (
          <CommentLayout>
            <CommentTitleWrapper>
              <CommentTitle
                nickname={writerNickname}
                elapsedTime={elapsedTime}
                mark={markOfOwner()}
                isOwner={owner}
                editClickHandler={onClick}
              />
            </CommentTitleWrapper>
            <CommentContentWrapper>
              {content}
            </CommentContentWrapper>
          </CommentLayout>
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
