import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

// TODO: 이슈 컴포넌트 연결
// import Issue from './Issue';

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

    const allIssueIds = issues.map((issue) => issue.id);
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
      {issues.map((issue) => (
        <div>
          <input
            onClick={() => handleCheckboxClick(issue.id)}
            checked={selections.includes(issue.id)}
            type="checkbox"
          />
          {/* <Issue
            issue={issue}
          /> */}
        </div>
      ))}
    </>
  );
}

Issues.propTypes = {
  issues: PropTypes.arrayOf(PropTypes.object).isRequired,
};
