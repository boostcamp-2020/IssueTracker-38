import React, { useEffect, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import { issueAPI } from '../apis/api';
import { updateStoreItem } from '../utils/utils';

export const IssuesContext = React.createContext();
function issueReducer(issues, { type, payload }) {
  switch (type) {
    case 'INIT':
      return payload;
    case 'ADD':
      return [payload, ...issues];
    case 'UPDATE':
      return updateStoreItem(issues, payload);
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
