import { useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { IssuesContext } from './stores/IssueStore';
import { LabelsContext } from './stores/LabelStore';
import { UsersContext } from './stores/UserStore';

const socket = io(process.env.SOCKET_URL);

export default function Socket() {
  const { dispatch: issueDispatch } = useContext(IssuesContext);
  const { dispatch: labelDispatch } = useContext(LabelsContext);
  const { dispatch: userDispatch } = useContext(UsersContext);

  useEffect(() => {
    socket.on('label', ({ type, payload }) => {
      labelDispatch({ type, payload: { ...payload, id: +payload.id } });
    });

    socket.on('user', ({ type, payload }) => {
      userDispatch({ type, payload: { ...payload, id: +payload.id } });
    });

    socket.on('issue', ({ type, payload }) => {
      if (type === 'ADD' || type === 'UPDATE') {
        issueDispatch({ type, payload });
        return;
      }

      if (type === 'UPDATE:isClosed') {
        const { issueIds, isClosed } = payload;
        issueIds.forEach((issueId) => issueDispatch({ type: 'UPDATE', payload: { id: issueId, isClosed } }));
      }
    });
  }, []);

  return null;
}
