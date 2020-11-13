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
      const { label, assignee } = payload;
      const targetIssue = getItemById(issues, +payload.id);
      const willBeUpdate = payload;

      if (label) {
        if (label.type === 'add') targetIssue.labels = [...targetIssue.labels, +label.id];
        if (label.type === 'delete') targetIssue.labels = targetIssue.labels.filter((labelId) => labelId !== +label.id);
        willBeUpdate.labels = targetIssue.labels;
      }

      if (assignee) {
        if (assignee.type === 'add') targetIssue.assignees = [...targetIssue.assignees, +assignee.id];
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
