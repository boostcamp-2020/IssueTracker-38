import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { UsersContext } from '../../stores/UserStore';
import { getItemById } from '../../utils/utils';

const styles = {
  nickname: {
    padding: '0 5px',
    fontWeight: '600',
  },
};

export default function AuthorProfile({ authorId }) {
  const { users } = useContext(UsersContext);
  const authorNickname = getItemById(users, authorId) ?.nickname;

  return (
    <div>
      <div css={styles.nickname}>{authorNickname}</div>
    </div>
  );
}

AuthorProfile.propTypes = {
  authorId: PropTypes.number.isRequired,
};
