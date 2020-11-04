import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { issueAPI } from '../../apis/api';
import { UsersContext } from '../../stores/UserStore';
import { IssuesContext } from '../../stores/IssueStore';
import { calElapsedTime, getItemById } from '../../utils/utils';
import { openedIcon, closedIcon } from '../../icons/icons';

const styles = {
  statusIcon: {
    margin: 'auto 5px auto 0',
  },
};

export default function DetailTitle({ issue }) {
  const title = issue?.title;
  const isClosed = issue?.isClosed;
  const userId = issue?.userId;
  const createdAt = issue?.createdAt;
  const { issueId } = useParams();

  const { dispatch } = useContext(IssuesContext);
  const { users } = useContext(UsersContext);
  const user = getItemById(users, +userId);
  const author = user?.email;

  const [titleState, setTitle] = useState(title);
  const [isEditActive, toggleEditActive] = useState(0);

  const checkEditStatus = () => {
    setTitle(title);
    toggleEditActive(!isEditActive);
  };
  const titleSaveClick = async () => {
    const result = await issueAPI.update({ id: issueId, title: titleState });
    if (!result) return;
    dispatch({ type: 'UPDATE', payload: { ...issue, title: titleState } });
    toggleEditActive(0);
  };

  return (
    <>
      <div>
        {isEditActive ? (
          <>
            <input type="text" value={titleState} onChange={(e) => setTitle(e.target.value)} />
            <div>
              #
              {issueId}
            </div>
            <button type="button" onClick={titleSaveClick}>
              save
            </button>
            <button type="button" onClick={checkEditStatus}>
              cancel
            </button>
          </>
        )
          : (
            <>
              <div>{title}</div>
              <div>
                #
                {issueId}
              </div>
              <button type="button" onClick={checkEditStatus}>
                edit
              </button>
            </>
          )}
      </div>
      <div>
        <svg
          css={styles.statusIcon}
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill={isClosed ? 'red' : 'green'}
        >
          <path
            fillRule="evenodd"
            d={isClosed ? closedIcon : openedIcon}
          />
        </svg>
        <div>
          {author}
          {' '}
          opened this issue at
          {' '}
          {calElapsedTime(createdAt)}
          {' '}
          ago
        </div>
      </div>
    </>
  );
}

DetailTitle.propTypes = {
  issue: PropTypes.shape.isRequired,
};
