import React, {
  useState, useRef, useCallback, useEffect, useContext,
} from 'react';
import { PropTypes } from 'prop-types';

import { useParams } from 'react-router-dom';
import SideBarItemTitle from './SideBarItemTitle';
import SideBarItemDropdown from './SideBarItemDropdown';

import { IssuesContext } from '../../stores/IssueStore';
import { getItemById } from '../../utils/utils';
import { issueAPI } from '../../apis/api';

const styles = {
  layout: {
    width: '300px',
    padding: '10px 0',
    borderBottom: '1px solid #eaecef',
  },
  item: {
    width: 'max-content',
    padding: '2px 10px',
    margin: '5px 5px 0 0',
    boxSizing: 'border-box',
    borderRadius: '15px',
  },
  defaultMessage: {
    color: '#586069',
    fontWeight: '100',
  },
  selfAssignButton: {
    '&:hover': {
      color: 'blue',
    },
  },
  progress: {
    height: '10px',
    backgroundColor: '#4CAF50',
  },
  bar: {
    width: '100%',
    backgroundColor: ' #ddd',
  },
};

export default function SideBarItem({
  title, defaultMessage, dropdownItems, assigned, author,
}) {
  const [isAction, toggleAction] = useState(false);
  const dropdownRef = useRef(null);
  const { issueId } = useParams();
  const { issues, dispatch } = useContext(IssuesContext);

  const handleAssignButton = () => {
    toggleAction(!isAction);
  };

  const pageClickEvent = useCallback(({ target }) => {
    const { current } = dropdownRef;
    if (current && !current.contains(target)) toggleAction(!isAction);
  }, [isAction]);

  useEffect(() => {
    if (isAction) window.addEventListener('click', pageClickEvent);
    return () => window.removeEventListener('click', pageClickEvent);
  }, [isAction]);

  const assignMyself = (id) => async () => {
    const type = 'add';
    const targetIssue = { ...getItemById(issues, +issueId) };

    const { assignees } = targetIssue;
    assignees.push(id);

    const result = await issueAPI.update({ id: issueId, assignee: { type, id } });
    if (!result) return;

    dispatch({ type: 'UPDATE', payload: targetIssue });
  };

  const progressPercentage = (milestoneId) => {
    let closedCount = 0;
    const checkPoints = issues.filter((checkpoint) => checkpoint.milestoneId === +milestoneId);
    checkPoints.forEach((element) => {
      if (element.isClosed === 1) closedCount += 1;
    });

    return checkPoints.length ? (closedCount * 100) / checkPoints.length : 0;
  };

  return (
    <div css={styles.layout}>
      <SideBarItemTitle
        title={title}
        onClick={handleAssignButton}
      />
      {isAction && (
        <SideBarItemDropdown
          items={dropdownItems}
          assigned={assigned}
          title={title}
          dropdownRef={dropdownRef}
        />
      )}
      <div>
        {!assigned || assigned.length === 0 || Object.keys(assigned[0]).length === 0
          ? title === 'Assignees'
            ? (
              <div css={styles.defaultMessage}>
                {defaultMessage}
                <span css={styles.selfAssignButton} onClick={assignMyself(author.id)}>assign yourself</span>
              </div>
            )
            : <div css={styles.defaultMessage}>{defaultMessage}</div>
          : title === 'Milestone'
            ? assigned.map((element) => (
              <div css={styles.item}>
                <div css={styles.bar}>
                  <div css={{ ...styles.progress, width: `${progressPercentage(element.id)}%` }} />
                </div>
                {element.title}
              </div>
            ))
            : assigned.map((element) => (
              <div css={{ ...styles.item, background: element.color, display: element.name ? 'inline-block' : 'block' }}>
                {element.name || element.title || element.email }
              </div>
            ))}
      </div>
    </div>
  );
}

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string.isRequired,
  dropdownItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  assigned: PropTypes.arrayOf(PropTypes.object).isRequired,
  author: PropTypes.node.isRequired,
};
