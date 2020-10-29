import React, { useState } from "react";

import TotalCheckBox from "./TotalCheckBox";
import Issues from "./Issues";
import Dropdown from "./Dropdown";

const styles = {
  layout: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid ",
    justifyContent: "space-between",
    padding: "15px"
  }
};

export default function IssueMain({ issues, items }) {
  const [selections, setSelections] = useState([]);
  const [selectionSwitch, toggleSelectionSwitch] = useState(false);

  const handleCheckboxClick = issueId => {
    if (selections.includes(issueId)) {
      setSelections(selections.filter(selection => selection !== issueId));
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

    const allIssueIds = issues.map(issue => issue.issueId);
    setSelections(allIssueIds);
  };

  return (
    <>
      <div css={styles.layout}>
        <TotalCheckBox
          selections={selections}
          selectionSwitch={selectionSwitch}
          handleCheckboxSwitch={handleCheckboxSwitch}
        />
        <Dropdown title="더미" items={items} />
      </div>

      <Issues
        issues={issues}
        handleCheckboxClick={handleCheckboxClick}
        selections={selections}
      />
    </>
  );
}
