import React, { useEffect, useReducer } from 'react';
import { PropTypes } from 'prop-types';
import { labelAPI } from '../apis/api';
import { updateStoreItem, deleteStoreItem } from '../utils/utils';

export const LabelsContext = React.createContext();
function labelReducer(labels, { type, payload }) {
  switch (type) {
    case 'INIT':
      return payload;
    case 'ADD':
      return [...labels, payload];
    case 'UPDATE':
      return updateStoreItem(labels, payload);
    case 'DELETE':
      return deleteStoreItem(labels, payload);
    default:
      return labels;
  }
}

export default function LabelStore({ children }) {
  const [labels, dispatch] = useReducer(labelReducer, []);
  const setInitState = async () => {
    const initState = await labelAPI.readAll();
    dispatch({ type: 'INIT', payload: initState });
  };
  useEffect(() => {
    setInitState();
  }, []);
  return (
    <LabelsContext.Provider value={{ labels, dispatch }}>
      {children}
    </LabelsContext.Provider>
  );
}

LabelStore.propTypes = {
  children: PropTypes.node.isRequired,
};
