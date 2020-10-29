import React, { useState } from "react";
import { PropTypes } from "prop-types";

import Issue from "./Issue";

export default function Issues({ issues, handleCheckboxClick, selections }) {
  return (
    <>
      {issues.map(
        ({ title, milestone, label, issueId, createdAt, asignee }) => (
          <div key={issueId}>
            <input
              onClick={() => handleCheckboxClick(issueId)}
              checked={selections.includes(issueId)}
              type="checkbox"
            />
            <Issue
              title={title}
              milestone={milestone}
              label={label}
              issueId={issueId}
              createdAt={createdAt}
              asignee={asignee}
            />
          </div>
        )
      )}
    </>
  );
}

Issues.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired
};
