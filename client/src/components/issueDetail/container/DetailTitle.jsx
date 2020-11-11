import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { issueAPI } from '../../../apis/api';
import { UsersContext } from '../../../stores/UserStore';
import { IssuesContext } from '../../../stores/IssueStore';
import { calElapsedTime, getItemById } from '../../../utils/utils';
import IssueTitle from '../presentational/IssueTitle';
import IssueState from '../presentational/IssueState';
import IssueDetail from '../presentational/IssueDetail';
import IssueTitleEditInput from '../presentational/IssueTitleEditInput';
import IssueTitleButton from '../presentational/IssueTitleButton';
import DefaultButton from '../presentational/DefaultButton';
import { DetailTitleWrapper, DetailTitleDescriptionWrapper } from '../layouts/DetailTitleWrapper';

export default function DetailTitle({ issue, countOfComments }) {
  const title = issue?.title;
  const isClosed = issue?.isClosed;
  const userId = issue?.userId;
  const createdAt = issue?.createdAt;
  const { issueId } = useParams();

  const { dispatch } = useContext(IssuesContext);
  const { users } = useContext(UsersContext);
  const author = getItemById(users, +userId)?.nickname;

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
      <DetailTitleWrapper>
        {isEditActive
          ? (
            <>
              <IssueTitleEditInput titleState={titleState} setTitle={setTitle} />
              <IssueTitleButton text="save" onClick={titleSaveClick} />
              <IssueTitleButton text="cancel" onClick={checkEditStatus} />
            </>
          )
          : (
            <>
              <IssueTitle title={title} issueId={issueId} checkEditStatus={checkEditStatus} />
              <DefaultButton text="Edit" onClick={checkEditStatus} />
            </>
          )}
      </DetailTitleWrapper>
      <DetailTitleDescriptionWrapper>
        <IssueState isClosed={isClosed} />
        <IssueDetail
          author={author}
          elapsedTime={calElapsedTime(createdAt)}
          countOfComments={countOfComments}
        />
      </DetailTitleDescriptionWrapper>
    </>
  );
}

DetailTitle.propTypes = {
  issue: PropTypes.shape.isRequired,
  countOfComments: PropTypes.number.isRequired,
};
