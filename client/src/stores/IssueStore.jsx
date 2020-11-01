import React, { useEffect, useReducer } from 'react';
import { issueAPI } from '../apis/api';
export const IssuesContext = React.createContext();
function issueReducer(issues, { type, payload }) {
  switch (type) {
    case 'INIT':
      return payload;
    case 'ADD':
      return [...issues, payload];
    default:
  }
}
export default function IssueStore(props) {
  const [issues, dispatch] = useReducer(issueReducer, []);
  const setInitState = async () => {
    const initState = await issueAPI.readAll();
    dispatch({ type: 'INIT', payload: initState });
  };
  useEffect(() => {
    setInitState();
  }, []);
  return (
    <IssuesContext.Provider value={{ issues, dispatch }}>
      {props.children}
    </IssuesContext.Provider>
  );
}