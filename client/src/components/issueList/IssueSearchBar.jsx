import React from 'react';
import { PropTypes } from 'prop-types';
import FilterButton from './FilterButton';
import NewIssue from './NewIssueButton';
import Search from './Search';
import GroupButton from './GroupButton';
import { labelIcon, milestoneIcon } from '../../icons/icons';

const styles = {
  layout: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '1100px',
    margin: '30px auto',
  },
  searchBar: {
    display: 'flex',
    width: '60%',
  },
  buttonGroup: {
    display: 'flex',
  },
  labelButton: {
    border: '1px solid grey',
    borderRadius: '6px 0 0 6px',
    padding: '5px 10px',
    display: 'flex',
  },
  milestoneButton: {
    border: '1px solid grey',
    borderRadius: '0 6px 6px 0',
    padding: '5px 10px',
    display: 'flex',
  },
};

export default function IssueSearchBar({ countOfLabels, countOfMilestones }) {
  return (
    <div css={styles.layout}>
      <div css={styles.searchBar}>
        <FilterButton />
        <Search />
      </div>
      <div css={styles.buttonGroup}>
        <GroupButton
          title="Labels"
          countOfGroup={countOfLabels}
          emotion={styles.labelButton}
          svgPathD={labelIcon}
        />
        <GroupButton
          title="Milestones"
          countOfGroup={countOfMilestones}
          emotion={styles.milestoneButton}
          svgPathD={milestoneIcon}
        />
      </div>
      <NewIssue />
    </div>
  );
}

IssueSearchBar.propTypes = {
  countOfLabels: PropTypes.number.isRequired,
  countOfMilestones: PropTypes.number.isRequired,
};
