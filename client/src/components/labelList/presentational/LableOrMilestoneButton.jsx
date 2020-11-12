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
      backgroundColor: '#6464de',
      width: '100px',
    },
    milestoneButton: {
      border: '1px solid grey',
      borderRadius: '0 6px 6px 0',
      padding: '5px 10px',
      display: 'flex',
      width: '130px',
    },
    groupButtonWrapper: {
      fontSize: '16px',
      fontWeight: 'bold',
      display: 'flex',
      width: '250px',
      color: 'black',
    },
  };
  return (
    <div css={styles.groupButtonWrapper}>
      <GroupButton
        title="Labels"
        emotion={styles.labelButton}
        svgPathD={labelIcon}
        linkTo="/labelList"
        titleColor="white"
      />
      <GroupButton
        title="Milestones"
        emotion={styles.milestoneButton}
        svgPathD={milestoneIcon}
        linkTo="/milestoneList"
        titleColor="black"
      />
    </div>
  );
}
