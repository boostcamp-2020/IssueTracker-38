import React from "react";

export default function TotalCheckBox({
  selections,
  selectionSwitch,
  handleCheckboxSwitch
}) {
  return (
    <div>
      <input
        onClick={handleCheckboxSwitch}
        checked={selectionSwitch}
        type="checkbox"
      />
      <span>
        {selections.length}
        selected
      </span>
    </div>
  );
}
