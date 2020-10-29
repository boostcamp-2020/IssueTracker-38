import React from "react";
import { PropTypes } from "prop-types";

const styles = {
  layout: {
    display: "flex"
  }
};

export default function Issue({
  title,
  milestone,
  label,
  issueId,
  createdAt,
  asignee
}) {
  return (
    <div>
      <div className="content">
        <div css={styles.layout}>
          <a href="/">{title}</a>
          <div>{label}</div>
        </div>
        <div css={styles.layout} className="details">
          <div>{issueId}</div>
          <div>{createdAt}</div>
          <div>{asignee}</div>
          <div>{milestone}</div>
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
  asignee: PropTypes.string.isRequired
};
