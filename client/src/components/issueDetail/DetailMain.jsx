import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { IssuesContext } from '../../stores/IssueStore';
import DetailTitle from './DetailTitle';

export default function DetailMain() {
    const { issues } = useContext(IssuesContext);
    const { issueId } = useParams();
    const [issue, setIssue] = useState();

    useEffect(() => {
        const mathched = issues.find((v) => v.id === +issueId);
        setIssue(mathched);
    }, [issues]);

    return (
        <>
            <DetailTitle
                issue={issue}
            />
        </>
    );
}
