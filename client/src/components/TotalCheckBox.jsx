import React from 'react';
import { PropTypes } from 'prop-types';

export default function TotalCheckBox({
  selections,
  selectionSwitch,
  handleCheckboxSwitch,
}) {
  return (
    <div>
      <input
        onClick={handleCheckboxSwitch}
        checked={selectionSwitch}
        type="checkbox"
      />
      {selections.length === 0 ? (
        <></>
      ) : (
        <span>
          {' '}
          {selections.length}
          {' '}
          selected
        </span>
      )}
    </div>
  );
}

TotalCheckBox.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectionSwitch: PropTypes.bool.isRequired,
  handleCheckboxSwitch: PropTypes.func.isRequired,
};
