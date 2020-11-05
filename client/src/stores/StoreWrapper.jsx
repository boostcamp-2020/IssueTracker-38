import React from 'react';
import { PropTypes } from 'prop-types';
import UserStore from './UserStore';
import MilestoneStore from './MilestoneStore';
import LabelStore from './LabelStore';
import IssueStore from './IssueStore';
import AuthStore from './AuthStore';

export default function StoreWrapper({ children }) {
  return (
    <AuthStore>
      <UserStore>
        <LabelStore>
          <MilestoneStore>
            <IssueStore>
              {children}
            </IssueStore>
          </MilestoneStore>
        </LabelStore>
      </UserStore>
    </AuthStore>
  );
}

StoreWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
