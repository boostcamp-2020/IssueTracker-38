import React, { useState, useContext } from 'react';
import { PropTypes } from 'prop-types';
import { IssuesContext } from '../stores/IssueStore';
import TotalCheckBox from './TotalCheckBox';
import Issues from './Issues';
import Dropdown from './Dropdown';

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

export default function IssueMain({ items }) {
  const { issues } = useContext(IssuesContext);
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
        <div css={styles.dropdowns}>
          <Dropdown title="Author" items={items} />
          <Dropdown title="Label" items={items} />
          <Dropdown title="Projects" items={items} />
          <Dropdown title="Milestone" items={items} />
          <Dropdown title="Asignee" items={items} />
          <Dropdown title="Sort" items={items} />
        </div>
      </div>
      <Issues
        issues={issues}
        handleCheckboxClick={handleCheckboxClick}
        selections={selections}
      />
    </div>
  );
}

IssueMain.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
