import React from 'react';
import { removeUserInfo } from '../../../utils/utils';
import TextButton from '../../../components/issueDetail/presentational/TextButton';

const style = {
  position: 'absolute',
  top: '20px',
  right: '10px',
  color: 'white',
  '&:hover': {
    color: '#6bff6b',
  },
};

export default function Logout() {
  return (
    <TextButton text="Logout" onClick={removeUserInfo} extraStyle={style} />
  );
}