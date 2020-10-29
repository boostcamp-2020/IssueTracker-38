import React from "react";

import Header from "./components/Header";
import FilterButton from "./components/FilterButton";
import IssueMain from "./components/IssueMain";
import NewIssue from "./components/NewIssueButton";
import { dummyIssues, dummyDropdownItems } from "./dummyData";

export default function App() {
  return (
    <>
      <Header />
      <FilterButton />
      <NewIssue />
      <IssueMain issues={dummyIssues} items={dummyDropdownItems} />
    </>
  );
}
