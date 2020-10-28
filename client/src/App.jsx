import React from 'react';

import Header from './components/Header';
import FilterButton from './components/FilterButton';
import Issues from './components/Issues';
import Dropdown from './components/Dropdown';

import { dummyIssues, dummyDropdownItems } from './dummyData';

export default function App() {
  return (
    <>
      <Header />
      <FilterButton />
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
