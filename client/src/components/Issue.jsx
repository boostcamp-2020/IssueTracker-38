import React from 'react';
import { PropTypes } from 'prop-types';

export default function Issue({
  title,
  milestone,
  label,
  issueId,
  createdAt,
  asignee,
}) {
  return (
    <div>
      <div className="content">
        <div>
          <a href="/">{title}</a>
        </div>
        <div className="details">
          <div>{milestone}</div>
          <div>{label}</div>
          <div>{issueId}</div>
          <div>{createdAt}</div>
          <div>{asignee}</div>
        </div>
      </div>
    </div>
  );
}

Issue.propTypes = {
  title: PropTypes.string.isRequired,
  milestone: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  issueId: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  asignee: PropTypes.string.isRequired,
};
