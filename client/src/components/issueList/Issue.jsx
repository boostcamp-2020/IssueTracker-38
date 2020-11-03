import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { UsersContext } from '../../stores/UserStore';
import { MilestoneContext } from '../../stores/MilestoneStore';
import { LabelsContext } from '../../stores/LabelStore';
import { calElapsedTime } from '../../utils/utils';

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
    margin: 'auto 0',
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

  const { email: userEmail } = users.length > 0 ? users.find((u) => u.id === userId) : ' ';
  const { title: milestoneTitle } = milestones.length > 0 ? milestones.find((m) => m.id === milestoneId) : ' ';

  return (
    <div css={styles.body}>
      <div css={styles.layout}>
        <svg
          css={styles.statusIcon}
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
          fill={isClosed ? 'red' : 'green'}
        >
          <path
            fillRule="evenodd"
            d={isClosed
              ? 'M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5l-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7c1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7s7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z'
              : 'M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z'}
          />
        </svg>
        <a css={styles.title} href={`/detail/${id}`}>
          {title}
        </a>
        {labels.map((num) => {
          const target = allLabels.find((label) => label.id === num);
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
          {userEmail}
        </div>
        <svg
          css={styles.milestoneIcon}
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          role="img"
        >
          <path
            fillRule="evenodd"
            d="M7.75 0a.75.75 0 01.75.75V3h3.634c.414 0 .814.147 1.13.414l2.07 1.75a1.75 1.75 0 010 2.672l-2.07 1.75a1.75 1.75 0 01-1.13.414H8.5v5.25a.75.75 0 11-1.5 0V10H2.75A1.75 1.75 0 011 8.25v-3.5C1 3.784 1.784 3 2.75 3H7V.75A.75.75 0 017.75 0zm0 8.5h4.384a.25.25 0 00.161-.06l2.07-1.75a.25.25 0 000-.38l-2.07-1.75a.25.25 0 00-.161-.06H2.75a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h5z"
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
  isClosed: PropTypes.bool.isRequired,
};
