import React, { useState } from 'react';

export default function DetailTitle(issue) {
    const { title: title,
        id: issueId,
        isClosed: status,
        userId: author,
        createdAt: createdAt, } = issue

    return (
        <>
            <div>
                {title}#{issueId}
            </div>
            <div>
                <div>{status}</div>
                <div>{author} opened this issue at {createdAt}</div>
            </div>
        </>
    );
}