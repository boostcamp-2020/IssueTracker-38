import React, { useContext } from 'react';

import { useParams } from 'react-router-dom';
import { IssuesContext } from '../../stores/IssueStore';
import DetailTitle from './DetailTitle';

export default function DetailMain() {
    const { issues } = useContext(IssuesContext);
    const { issueId } = useParams();
    return (
        <>
            <DetailTitle
                issue={issues.find((issue) => issue.id === +issueId)}
            />
        </>
    );
}
