import React, { useState, useContext } from 'react';

import { IssuesContext } from '../stores/IssueStore';
import { LabelsContext } from '../stores/LabelStore';
import { MilestoneContext } from '../stores/MilestoneStore';
import { UsersContext } from '../stores/UserStore';
import { IssuesContext } from '../stores/IssueStore';
import TotalCheckBox from './TotalCheckBox';
import Issues from './Issues';
import Dropdown from './Dropdown';
import MarkAsDropdown from './MarkAsDropdown';

const styles = {
  body: {
    width: '1100px',
    margin: '0 auto',
    border: '1px solid lightgrey',
    borderRadius: '6px',
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid lightgrey',
    borderRadius: '6px 6px 0 0',
    justifyContent: 'space-between',
    padding: '15px',
    backgroundColor: '#efefef',
  },
  dropdowns: {
    display: 'flex',
  },
};


export default function IssueMain() {
  const { issues } = useContext(IssuesContext);
  const { labels } = useContext(LabelsContext);
  const { milestones } = useContext(MilestoneContext);
  const { users } = useContext(UsersContext);
  
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
    <div css={styles.body}>
      <div css={styles.layout}>
        <TotalCheckBox
          selections={selections}
          selectionSwitch={selectionSwitch}
          handleCheckboxSwitch={handleCheckboxSwitch}
        />
        {selections.length > 0
          ? (
            <div css={styles.dropdowns}>
              <MarkAsDropdown selections={selections} />
            </div>
          )
          : (
            <div css={styles.dropdowns}>
              <Dropdown title="Author" items={users.map((user) => ({ ...user, value: user.email }))} />
              <Dropdown title="Label" items={labels.map((label) => ({ ...label, value: label.name }))} />
              <Dropdown title="Milestone" items={milestones.map((milestone) => ({ ...milestone, value: milestone.title }))} />
              <Dropdown title="Asignee" items={users.map((user) => ({ ...user, value: user.email }))} />
            </div>
          )}
      </div>
      <Issues
        issues={issues}
        handleCheckboxClick={handleCheckboxClick}
        selections={selections}
      />
    </div>
  );
}
