import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IssuesContext } from '../../../stores/IssueStore';
import DetailTitle from './DetailTitle';
import NewComment from './NewComment';
import CommentList from '../presentational/CommentList';
import SideBar from './SideBar';
import { getItemById, updateStoreItem } from '../../../utils/utils';
import { commentAPI } from '../../../apis/api';

const styles = {
  body: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '1200px',
    boxSizing: 'border-box',
    margin: '0 auto',
  },
  main: {
    width: '1200px',
    display: 'flex',
  },
};

export default function DetailMain() {
  const currentUser = JSON.parse(localStorage.getItem('userInfo'));
  const { issues } = useContext(IssuesContext);
  const { issueId } = useParams();
  const [issue, setIssue] = useState();
  const [comments, setComments] = useState([]);
  const setInitComments = async () => setComments(await commentAPI.readByIssue(issueId));

  useEffect(() => {
    setInitComments();
  }, []);

  useEffect(() => {
    const mathched = getItemById(issues, +issueId);
    setIssue(mathched);
  }, [issues]);

  const addComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const updateComment = (id, content) => {
    const updatedComments = updateStoreItem(comments, { id, content });
    setComments(updatedComments);
  };

  return (
    <div css={styles.body}>
      <DetailTitle
        issue={issue}
        countOfComments={comments.length - 1}
      />
      <div css={styles.main}>
        <div>
          <CommentList
            issueAuthorId={issue ?.userId}
            comments={comments}
            updateComment={updateComment}
          />
          <NewComment
            user={currentUser}
            issue={issue}
            addComment={addComment}
          />
        </div>
        <SideBar />
      </div>
    </div>
  );
}
