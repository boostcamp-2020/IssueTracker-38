import React from "react";
import { PropTypes } from "prop-types";

export default function GroupButton({ countOfGroup, svgPathD, title }) {
  return (
    <div>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path fillRule="evenodd" d={svgPathD} />
      </svg>
      <span>{title}</span>
      <span>{countOfGroup}</span>
    </div>
  );
}

GroupButton.propTypes = {
  countOfGroup: PropTypes.number.isRequired,
  svgPathD: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
