import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { useInput } from '../../hooks/hooks';

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

  const [inputTitle, handleInputTitle] = useInput('');
  const [inputContent, handleInputContent] = useInput('');

  const [assignedUsers, setAssignedUsers] = useState([]);
  const [assignedLabels, setAssignedLabels] = useState([]);
  const [assignedMilestone, setAssignedMilestone] = useState([]);

  const submitNewIssue = () => {
    console.log('inputTitle', inputTitle);
    console.log('inputContent', inputContent);
    console.log('assignedUsers', assignedUsers);
    console.log('assignedLabels', assignedLabels);
    console.log('assignedMilestone', assignedMilestone);
    // TODO: 데이터들을 모아서 API 요청을 여기서 하면 됨
    // 필요한 데이터: userId(이슈 생성자), title, content, assignees(id), labels(id), millstoneId(id)
  };

  const cancelNewIssue = () => {
    history.push('/');

    handleInputTitle({ target: { value: '' } });
    handleInputContent({ target: { value: '' } });
    setAssignedUsers([]);
    setAssignedLabels([]);
    setAssignedMilestone([]);
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
