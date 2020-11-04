import React, { useState, useContext } from 'react';
import { issueAPI } from '../../apis/api';
import { useParams } from 'react-router-dom';
import { openedIcon, closedIcon } from '../../icons/icons';

const styles = {
    statusIcon: {
        margin: 'auto 5px auto 0',
    },
}
export default function DetailTitle({ issue }) {
    const title = issue ? issue.title : " "
    const isClosed = issue ? issue.isClosed : " "
    const userId = issue ? issue.userId : " "
    const createdAt = issue ? issue.createdAt : " "
    const { issueId } = useParams();

    const { users } = useContext(UsersContext);
    const user = users.length > 0 ? users.find((user) => user.id === +userId) : " ";
    const author = user ? user.email : " ";

    const [titleState, setTitle] = useState(title);
    const [isEditActive, toggleEditActive] = useState(0);

    const checkEditStatus = () => {
        setTitle(title);
        toggleEditActive(!isEditActive)
    }
    const titleSaveClick = async () => {
        await issueAPI.updateTitle({ issueId: issueId, title: titleState });
        toggleEditActive(0)
    }

    return (
        <>
            <div>
                {isEditActive ? <>
                    <input type="text" value={titleState} onChange={(e) => setTitle(e.target.value)} />
                    <div>#{issueId}</div>
                    <span onClick={titleSaveClick}>
                        save
                    </span>
                    <span onClick={checkEditStatus}>
                        cancel
                    </span>
                </>
                    : <>
                        <div>{title}</div>
                        <div>#{issueId}</div>
                        <span onClick={checkEditStatus}>
                            edit
                        </span>
                    </>}
            </div>
            <div>
                <svg
                    css={styles.statusIcon}
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                    fill={isClosed ? 'red' : 'green'}
                >
                    <path
                        fillRule="evenodd"
            d={isClosed ? closedIcon : openedIcon}
                    />
                </svg>
                <div>{author} opened this issue at {createdAt}</div>
            </div>
        </>
    );
}