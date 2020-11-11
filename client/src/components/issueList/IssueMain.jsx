import React, { useState, useContext, useEffect } from 'react';

import { IssuesContext } from '../../stores/IssueStore';
import { LabelsContext } from '../../stores/LabelStore';
import { MilestoneContext } from '../../stores/MilestoneStore';
import { UsersContext } from '../../stores/UserStore';
import IssueSearchBar from './IssueSearchBar';
import TotalCheckBox from './TotalCheckBox';
import Issues from './Issues';
import Dropdown from './Dropdown';
import MarkAsDropdown from './MarkAsDropdown';

const styles = {
  body: {
    width: '1100px',
    margin: '0 auto',
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
  const [filters, setFilters] = useState({
    Author: null, Label: [], Milestone: null, Assignee: null,
  });
  const [filteredIssues, setFilteredIssues] = useState([]);

  const checkFilter = (item) => {
    if (filters.Assignee && item.assignees.indexOf(filters.Assignee) === -1) return false;
    if (filters.Author && item.userId !== filters.Author) return false;
    if (filters.Milestone && item.milestoneId !== filters.Milestone) return false;
    if (filters.Label.length !== 0) {
      const remain = item.labels.filter((label) => filters.Label.indexOf(label) === -1);
      if (remain.length !== item.labels.length - filters.Label.length) return false;
    }
    return true;
  };

  const checkIsFilterActive = () => filters.Author || filters.Label.length
  || filters.Milestone || filters.Assignee;

  const filterIssues = (isFilterActive) => {
    if (!isFilterActive) {
      setFilteredIssues([...issues]);
      return;
    }
    const result = issues.reduce((prev, cur) => {
      if (checkFilter(cur)) prev.push(cur);
      return prev;
    }, []);

    setFilteredIssues(result);
  };

  useEffect(() => {
    filterIssues(checkIsFilterActive());
  }, [issues]);

  useEffect(() => {
    filterIssues(checkIsFilterActive());
  }, [filters]);

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

    const allIssueIds = filteredIssues.map((issue) => issue.id);
    setSelections(allIssueIds);
  };

  return (
    <>
      <IssueSearchBar countOfLabels={labels.length} countOfMilestones={milestones.length} />
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
                <MarkAsDropdown selections={selections} setSelections={setSelections} />
              </div>
            )
            : (
              <div css={styles.dropdowns}>
                <Dropdown title="Author" items={users.map((user) => ({ ...user, value: user.nickname }))} filters={filters} setFilters={setFilters} />
                <Dropdown title="Label" items={labels.map((label) => ({ ...label, value: label.name }))} filters={filters} setFilters={setFilters} />
                <Dropdown title="Milestone" items={milestones.map((milestone) => ({ ...milestone, value: milestone.title }))} filters={filters} setFilters={setFilters} />
                <Dropdown title="Assignee" items={users.map((user) => ({ ...user, value: user.nickname }))} filters={filters} setFilters={setFilters} />
              </div>
            )}
        </div>
        <Issues
          issues={filteredIssues}
          handleCheckboxClick={handleCheckboxClick}
          selections={selections}
        />
      </div>
    </>
  );
}
