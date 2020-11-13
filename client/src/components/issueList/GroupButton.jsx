import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const styles = {
  count: {
    backgroundColor: 'lightgrey',
    padding: '2px 8px',
    fontSize: '13px',
    borderRadius: '15px',
    margin: 'auto 5px',
    color: 'grey',
  },
  buttonIcon: {
    margin: 'auto 5px',
  },
  title: {
    textDecoration: 'none',
    color: 'black',
  },
};

export default function GroupButton({
  countOfGroup,
  svgPathD,
  title,
  emotion,
  linkTo,
  titleColor = {},
}) {
  return (
    <div css={emotion}>
      <svg viewBox="0 0 16 16" width="16" height="16" css={{ ...styles.buttonIcon, fill: titleColor }}>
        <path fillRule="evenodd" d={svgPathD} />
      </svg>
      <span>
        {' '}
        <Link to={linkTo} style={{ ...styles.title, color: titleColor }}>{title}</Link>
        {' '}
      </span>
      {countOfGroup ? <span css={styles.count}>{countOfGroup}</span>
        : <></>}
    </div>
  );
}

GroupButton.propTypes = {
  countOfGroup: PropTypes.number.isRequired,
  svgPathD: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  emotion: PropTypes.objectOf(PropTypes.node).isRequired,
  linkTo: PropTypes.string.isRequired,
  titleColor: PropTypes.shape.isRequired,
};
