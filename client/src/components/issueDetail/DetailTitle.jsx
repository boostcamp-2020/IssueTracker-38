import React, { useState, useContext } from 'react';
import { issueAPI } from '../../apis/api';
import { useParams } from 'react-router-dom';
import { UsersContext } from '../../stores/UserStore'

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
                        d={isClosed
                            ? 'M7 10h2v2H7v-2zm2-6H7v5h2V4zm1.5 1.5l-1 1L12 9l4-4.5l-1-1L12 7l-1.5-1.5zM8 13.7A5.71 5.71 0 0 1 2.3 8c0-3.14 2.56-5.7 5.7-5.7c1.83 0 3.45.88 4.5 2.2l.92-.92A6.947 6.947 0 0 0 8 1C4.14 1 1 4.14 1 8s3.14 7 7 7s7-3.14 7-7l-1.52 1.52c-.66 2.41-2.86 4.19-5.48 4.19v-.01z'
                            : 'M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z'}
                    />
                </svg>
                <div>{author} opened this issue at {createdAt}</div>
            </div>
        </>
    );
}