import React, { useEffect, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import { issueAPI } from '../apis/api';
import { updateStoreItem, getItemById } from '../utils/utils';

export const IssuesContext = React.createContext();
function issueReducer(issues, { type, payload }) {
  switch (type) {
    case 'INIT':
      return payload;
    case 'ADD':
      return [payload, ...issues];
    case 'UPDATE':
      console.log('issueStore Payload', payload);
      const { label, assignee } = payload;
      const targetIssue = getItemById(issues, +payload.id);
      const willBeUpdate = payload;

      console.log('targetIssue', targetIssue);
      console.log('issues', issues);

      if (label) {
        if (label.type === 'add') {
          console.log('before', targetIssue.labels);
          targetIssue.labels.push(+label.id);
          // targetIssue.labels = [...new Set(targetIssue.labels)];
          console.log('after', targetIssue.labels);
        }
        if (label.type === 'delete') targetIssue.labels = targetIssue.labels.filter((labelId) => labelId !== +label.id);
        willBeUpdate.labels = targetIssue.labels;
      }

      if (assignee) {
        if (assignee.type === 'add') targetIssue.assignees.push(+assignee.id);
        if (assignee.type === 'delete') targetIssue.assignees = targetIssue.assignees.filter((assigneeId) => assigneeId !== assignee.id);
        willBeUpdate.assignees = targetIssue.assignees;
      }
      delete willBeUpdate.label;
      delete willBeUpdate.assignee;

      willBeUpdate.id = +willBeUpdate.id;

      return updateStoreItem(issues, willBeUpdate);
    default:
      return issues;
  }
}

export default function IssueStore({ children }) {
  const [issues, dispatch] = useReducer(issueReducer, []);

  const setInitState = async () => {
    const initState = await issueAPI.readAll();
    dispatch({ type: 'INIT', payload: initState.reverse() });
    // issueListener(initState, dispatch);
  };

  useEffect(() => {
    setInitState();
  }, []);

  return (
    <IssuesContext.Provider value={{ issues, dispatch }}>
      {children}
    </IssuesContext.Provider>
  );
}

IssueStore.propTypes = {
  children: PropTypes.node.isRequired,
};
