import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IssuesContext } from '../../../stores/IssueStore';
import DetailTitle from './DetailTitle';
import NewComment from './NewComment';
import CommentList from '../presentational/CommentList';
import SideBar from './SideBar';
import { getItemById, updateStoreItem } from '../../../utils/utils';
import { commentAPI } from '../../../apis/api';
import { WrapperLayout, ContentLayout } from '../layouts/DetailMainLayout';

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
    <WrapperLayout>
      <DetailTitle
        issue={issue}
        countOfComments={comments.length - 1}
      />
      <ContentLayout>
        <div>
          <CommentList
            issueAuthorId={issue?.userId}
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
      </ContentLayout>
    </WrapperLayout>
  );
}
