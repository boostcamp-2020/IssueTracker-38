import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { UsersContext } from '../../stores/UserStore';
import { MilestoneContext } from '../../stores/MilestoneStore';
import { LabelsContext } from '../../stores/LabelStore';
import { calElapsedTime, getItemById, getNicknameByEmail } from '../../utils/utils';
import { openedIcon, closedIcon, milestoneIcon } from '../../icons/icons';

const styles = {
  body: {
    padding: '0 10px',
  },
  layout: {
    display: 'flex',
  },
  statusIcon: {
    margin: 'auto 5px auto 0',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bolder',
    textDecoration: 'none',
    color: 'black',
    marginRight: '10px',
  },
  label: {
    padding: '2px 5px',
    backgroundColor: 'violet',
    borderRadius: '2px',
    fontSize: '12px',
    fontWeight: 'bolder',
    margin: 'auto 2px',
  },
  details: {
    display: 'flex',
    fontSize: '12px',
    color: 'grey',
    marginTop: '5px',
  },
  detail: {
    marginRight: '5px',
  },
  milestoneIcon: {
    fill: 'grey',
  },
};

export default function Issue({
  id,
  title,
  userId,
  milestoneId,
  labels,
  createdAt,
  isClosed,
}) {
  const { users } = useContext(UsersContext);
  const { milestones } = useContext(MilestoneContext);
  const { labels: allLabels } = useContext(LabelsContext);

  const userEmail = getItemById(users, +userId)?.email;
  const author = getNicknameByEmail(userEmail || '@');
  const milestoneTitle = getItemById(milestones, +milestoneId)?.title;

  return (
    <div css={styles.body}>
      <div css={styles.layout}>
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
        <a css={styles.title} href={`/detail/${id}`}>
          {title}
        </a>
        {labels.map((labelId) => {
          const target = getItemById(allLabels, labelId);
          if (!target) return (<></>);
          return (
            <div css={{ ...styles.label, backgroundColor: target.color }}>
              {target.name}
            </div>
          );
        })}
      </div>
      <div css={styles.details}>
        <div css={styles.detail}>
          #
          {id}
        </div>
        <div css={styles.detail}>
          opened
          {' '}
          {calElapsedTime(createdAt)}
          {' '}
          ago
        </div>
        <div css={styles.detail}>
          by
          {' '}
          {author}
        </div>
        <svg
          css={styles.milestoneIcon}
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fillRule="evenodd"
            d={milestoneIcon}
          />
        </svg>
        <div css={styles.detail}>{milestoneTitle}</div>
      </div>
    </div>
  );
}

Issue.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  milestoneId: PropTypes.number.isRequired,
  labels: PropTypes.arrayOf(PropTypes.number).isRequired,
  createdAt: PropTypes.string.isRequired,
  isClosed: PropTypes.number.isRequired,
};
