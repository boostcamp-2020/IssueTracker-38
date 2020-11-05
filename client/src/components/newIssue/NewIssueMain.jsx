import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useInput } from '../../hooks/hooks';

import { AuthContext } from '../../stores/AuthStore';
import NewIssueTitle from './NewIssueTitle';
import NewIssueComment from './NewIssueComment';
import NewIssueButton from './NewIssueButton';
import NewIssueSideBar from './NewIssueSideBar';

const styles = {
  layout: {
    display: 'flex',
    justifyContent: 'center',
  },
  formLayout: {
    margin: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '800px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px 6px 0 0',
  },
  form: {
    width: '100%',
    flexWrap: 'wrap',
  },
};

export default function NewIssueMain() {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const [inputTitle, handleInputTitle] = useInput('');
  const [inputContent, handleInputContent] = useInput('');

  const [assignedUsers, setAssignedUsers] = useState([]);
  const [assignedLabels, setAssignedLabels] = useState([]);
  const [assignedMilestone, setAssignedMilestone] = useState([]);

  const resetForm = () => {
    handleInputTitle({ target: { value: '' } });
    handleInputContent({ target: { value: '' } });
    setAssignedUsers([]);
    setAssignedLabels([]);
    setAssignedMilestone([]);
  };

  const cancelNewIssue = () => {
    resetForm();

    history.push('/');
  };

  return (
    <div css={styles.layout}>
      <div css={styles.formLayout}>
        <div css={styles.form}>
          <NewIssueTitle
            value={inputTitle}
            onChange={handleInputTitle}
          />
          <NewIssueComment
            value={inputContent}
            onChange={handleInputContent}
          />
          <NewIssueButton
            inputContent={inputContent}
            onSubmit={submitNewIssue}
            onCancel={cancelNewIssue}
          />
        </div>
      </div>
      <div>
        <NewIssueSideBar
          currentUser={currentUser}
          assignedUsers={assignedUsers}
          setAssignedUsers={setAssignedUsers}
          assignedLabels={assignedLabels}
          setAssignedLabels={setAssignedLabels}
          assignedMilestone={assignedMilestone}
          setAssignedMilestone={setAssignedMilestone}
        />
      </div>
    </div>
  );
}
