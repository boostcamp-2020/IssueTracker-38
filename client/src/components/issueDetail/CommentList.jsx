import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Comment from './Comment';
import { commentAPI } from '../../apis/api';

export default function CommentList({ issueAuthorId }) {
  const { issueId } = useParams();
  const [comments, setComments] = useState([]);
  const setInit = async () => setComments(await commentAPI.readByIssue(issueId));

  useEffect(() => {
    setInit();
  }, []);

  return (
    <>
      {comments.map(({
        id, content, userId, createdAt, updatedAt,
      }) => (
        <Comment
          id={id}
          content={content}
          userId={userId}
          createdAt={createdAt}
          updatedAt={updatedAt}
          issueAuthorId={issueAuthorId}
        />
      ))}
    </>
  );
}

CommentList.propTypes = {
  issueAuthorId: PropTypes.number.isRequired,
};
