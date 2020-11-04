import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../stores/AuthStore';
import { IssuesContext } from '../../stores/IssueStore';
import { LabelsContext } from '../../stores/LabelStore';
import { MilestoneContext } from '../../stores/MilestoneStore';
import { UsersContext } from '../../stores/UserStore';
import DetailTitle from './DetailTitle';
import NewComment from './NewComment';

const styles = {
  body: {
  },
};

export default function DetailMain() {
  const { currentUser } = useContext(AuthContext);
  const { issues } = useContext(IssuesContext);
  const { labels } = useContext(LabelsContext);
  const { milestones } = useContext(MilestoneContext);
  const { users } = useContext(UsersContext);
  const { issueId } = useParams();
  const [issue, setIssue] = useState();

  useEffect(() => {
    const mathched = issues.find((v) => v.id === +issueId);
    setIssue(mathched);
  }, [issues]);

  return (
    <div css={styles.body}>
      <DetailTitle
        issue={issue}
      />
      <NewComment
        user={currentUser}
        issue={issue}
      />
    </div>
  );
}
