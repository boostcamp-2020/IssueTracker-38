import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../stores/AuthStore';
import { IssuesContext } from '../../stores/IssueStore';
import DetailTitle from './DetailTitle';
import NewComment from './NewComment';
import CommentList from './CommentList';
import SideBar from './SideBar';
import { getItemById } from '../../utils/utils';

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
  const { currentUser } = useContext(AuthContext);
  const { issues } = useContext(IssuesContext);
  const { issueId } = useParams();
  const [issue, setIssue] = useState();

  useEffect(() => {
    const mathched = getItemById(issues, +issueId);
    setIssue(mathched);
  }, [issues]);

  return (
    <div css={styles.body}>
      <DetailTitle
        issue={issue}
      />
      <div css={styles.main}>
        <div>
          <CommentList issueAuthorId={issue?.userId} />
          <NewComment
            user={currentUser}
            issue={issue}
          />
        </div>
        <SideBar />
      </div>
    </div>
  );
}
