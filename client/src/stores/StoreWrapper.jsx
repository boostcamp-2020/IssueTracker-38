import React from 'react';
import { PropTypes } from 'prop-types';
import UserStore from './UserStore';
import MilestoneStore from './MilestoneStore';
import LabelStore from './LabelStore';
import IssueStore from './IssueStore';

export default function StoreWrapper({ children }) {
  return (
    <UserStore>
      <LabelStore>
        <MilestoneStore>
          <IssueStore>
            {children}
          </IssueStore>
        </MilestoneStore>
      </LabelStore>
    </UserStore>
  );
}

StoreWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
