import React from 'react';
import GroupButton from '../../issueList/GroupButton';
import { labelIcon, milestoneIcon } from '../../../icons/icons';

export default function LableMain() {
const styles = {
  labelButton: {
    border: '1px solid grey',
    borderRadius: '6px 0 0 6px',
    padding: '5px 10px',
    display: 'flex',
    backgroundColor:'blue',
  },
  milestoneButton: {
    border: '1px solid grey',
    borderRadius: '0 6px 6px 0',
    padding: '5px 10px',
    display: 'flex',
  },
  groupButtonWrapper:{
    display:'flex',
    width: '250px',
    height:'30px',
  }
}
  return (
    <div css={styles.groupButtonWrapper}>
        <GroupButton
          title="Labels"
          emotion={styles.labelButton}
          svgPathD={labelIcon}
          linkTo='/labelList'
        />
        <GroupButton
          title="Milestone"
          emotion={styles.milestoneButton}
          svgPathD={milestoneIcon}
          linkTo='/milestoneList'
        />
    </div>
  );
}
