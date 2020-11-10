import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { useInput } from '../../hooks/hooks';

import { issueAPI } from '../../apis/api';

import { IssuesContext } from '../../stores/IssueStore';

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
  const currentUser = JSON.parse(localStorage.getItem('userInfo'));
  const { issues, dispatch } = useContext(IssuesContext);

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

  const submitNewIssue = async () => {
    if (inputTitle.trim().length === 0) {
      alert('제목을 입력해주세요');
      return;
    }

    const newIssue = {
      title: inputTitle,
      userId: currentUser.id,
      content: inputContent || 'No description',
      assignees: assignedUsers.map((user) => +user.id) || [],
      labels: assignedLabels.map((label) => +label.id) || [],
      milestoneId: +assignedMilestone[0]?.id || null,
    };

    const result = await issueAPI.create(newIssue);
    if (!result) return;

    alert('새로운 이슈를 추가하였습니다');
    resetForm();
    dispatch({
      type: 'ADD',
      payload: {
        ...result,
        assignees: newIssue.assignees,
        labels: newIssue.labels,
        milestoneId: newIssue.milestoneId,
      },
    });
    history.push('/');
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
