import React from 'react';

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

export default function IssueSearchBar() {
  return (
    <div css={styles.layout}>
      <div css={styles.searchBar}>
        <FilterButton />
        <Search />
      </div>
      <div css={styles.buttonGroup}>
        <GroupButton
          title="Labels"
          countOfGroup={4}
          emotion={styles.labelButton}
          svgPathD={labelIcon}
        />
        <GroupButton
          title="Milestones"
          countOfGroup={4}
          emotion={styles.milestoneButton}
          svgPathD={milestoneIcon}
        />
      </div>
      <NewIssue />
    </div>
  );
}
