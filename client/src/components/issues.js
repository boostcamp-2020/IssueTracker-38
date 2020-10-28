import React, { Component } from "react";

export default function Issue({
  title,
  milestone,
  label,
  issueId,
  createdAt,
  asignee
}) {
  return (
    <div>
      <input type="checkbox"></input>
      <div className="content">
        <div>
          <a href="/">{title}</a>
        </div>
        <div className="details">
          <div>{milestone}</div>
          <div>{label}</div>
          <div>{issueId}</div>
          <div>{createdAt}</div>
          <div>{asignee}</div>
        </div>
      </div>
    </div>
  );
}
