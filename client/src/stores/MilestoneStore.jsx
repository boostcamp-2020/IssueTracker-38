import React, { useEffect, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import { milestoneAPI } from '../apis/api';
import { updateStoreItem, deleteStoreItem } from '../utils/utils';

export const MilestoneContext = React.createContext();
function issueReducer(milestones, { type, payload }) {
  switch (type) {
    case 'INIT':
      return payload;
    case 'ADD':
      return [...milestones, payload];
    case 'UPDATE':
      return updateStoreItem(milestones, payload);
    case 'DELETE':
      return deleteStoreItem(milestones, payload);
    default:
      return milestones;
  }
}

export default function MilestoneStore({ children }) {
  const [milestones, dispatch] = useReducer(issueReducer, []);

  const setInitState = async () => {
    const initState = await milestoneAPI.readAll();
    dispatch({ type: 'INIT', payload: initState });
  };

  useEffect(() => {
    setInitState();
  }, []);

  return (
    <MilestoneContext.Provider value={{ milestones, dispatch }}>
      {children}
    </MilestoneContext.Provider>
  );
}

MilestoneStore.propTypes = {
  children: PropTypes.node.isRequired,
};
