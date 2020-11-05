import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { issueAPI } from '../../apis/api';
import { UsersContext } from '../../stores/UserStore';
import { IssuesContext } from '../../stores/IssueStore';
import { calElapsedTime, getItemById } from '../../utils/utils';
import { openedIcon, closedIcon } from '../../icons/icons';
import commonStyles from './commonStyles';

const styles = {
  issueTitle: {
    display: 'flex',
    width: '100%',
    paddingTop: '20px',
  },
  titleEdit: {
    width: '85%',
    fontSize: '16px',
    padding: '5px 10px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    '&:focus': {
      boxShadow: '0px 0px 5px #0366d6',
      outline: 'none',
    },
  },
  saveButton: {
    ...commonStyles.basicButton,
    margin: 'auto 10px auto auto',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: '#0366d6',
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  titleContext: {
    color: '#2f363d',
    fontSize: '30px',
  },
  issueNumber: {
    fontSize: '30px',
    color: '#6a737d',
  },
  statusIcon: {
    display: 'flex',
    color: 'white',
    borderRadius: '6px',
    padding: '2px 10px',
  },
  statusSvg: {
    margin: 'auto 5px auto 0',
  },
  statusContext: {
    marginBottom: '3px',
  },
  description: {
    display: 'flex',
    color: '#6a737d',
    width: '100%',
    padding: '5px 0 20px 0',
    borderBottom: '1px solid #e1e4e8',
  },
  issueDetail: {
    margin: 'auto 0 auto 10px',
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
      <div css={styles.issueTitle}>
        {isEditActive ? (
          <>
            <input css={styles.titleEdit} type="text" value={titleState} onChange={(e) => setTitle(e.target.value)} />
            <button css={styles.saveButton} type="button" onClick={titleSaveClick}>
              save
            </button>
            <button css={styles.cancelButton} type="button" onClick={checkEditStatus}>
              cancel
            </button>
          </>
        )
          : (
            <>
              <div css={styles.titleContext}>{title}</div>
              <div css={styles.issueNumber}>
                #
                {issueId}
              </div>
              <button css={commonStyles.basicButton} type="button" onClick={checkEditStatus}>
                Edit
              </button>
            </>
          )}
      </div>
      <div css={styles.description}>
        <div css={{ ...styles.statusIcon, backgroundColor: isClosed ? '#d73a49' : '#28a745' }}>
          <svg
            css={styles.statusSvg}
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d={isClosed ? closedIcon : openedIcon}
            />
          </svg>
          <p css={styles.statusContext}>{isClosed ? 'Close' : 'Open'}</p>
        </div>
        <div css={styles.issueDetail}>
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
