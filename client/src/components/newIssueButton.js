import React, { Component } from "react";

export default function NewIssue(props) {
  return (
    <button
      onClick={
        () => {
          alert("asdf");
        }
        //render newIssue component?
      }
    >
      New Issue!
    </button>
  );
}
