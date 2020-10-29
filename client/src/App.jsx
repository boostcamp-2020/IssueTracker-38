import React from "react";

import Header from "./components/Header";
import IssueMain from "./components/IssueMain";
import IssueSearchBar from "./components/IssueSearchBar";

import { dummyIssues, dummyDropdownItems } from "./dummyData";

export default function App() {
  return (
    <>
      <Header />
      <IssueSearchBar />
      <IssueMain issues={dummyIssues} items={dummyDropdownItems} />
    </>
  );
}
