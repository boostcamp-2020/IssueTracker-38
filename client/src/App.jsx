import React from 'react';

import Issues from './components/Issues';
import Dropdown from './components/Dropdown';

import { dummyIssues, dummyDropdownItems } from './dummyData';

export default function App() {
  return (
    <>
      <div>Issue Tracker</div>
      <Dropdown
        title="더미"
        items={dummyDropdownItems}
      />
      <Issues
        issues={dummyIssues}
      />
    </>
  );
}
