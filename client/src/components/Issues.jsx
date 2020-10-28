import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

import Issue from './Issue';

export default function Issues({ issues }) {
  const [selections, setSelections] = useState([]);
  const [selectionSwitch, toggleSelectionSwitch] = useState(false);

  const handleCheckboxClick = (issueId) => {
    if (selections.includes(issueId)) {
      setSelections(selections.filter((selection) => selection !== issueId));
      return;
    }

    setSelections([...selections, issueId]);
  };

  const handleCheckboxSwitch = () => {
    toggleSelectionSwitch(!selectionSwitch);

    if (selectionSwitch) {
      setSelections([]);
      return;
    }

    const allIssueIds = issues.map((issue) => issue.issueId);
    setSelections(allIssueIds);
  };

  return (
    <>
      <div>
        <input
          onClick={handleCheckboxSwitch}
          checked={selectionSwitch}
          type="checkbox"
        />
        <span>
          {selections.length}
          selected
        </span>
      </div>
      {issues.map(({
        title, milestone, label, issueId, createdAt, asignee,
      }) => (
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
      ))}
    </>
  );
}

Issues.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
};
