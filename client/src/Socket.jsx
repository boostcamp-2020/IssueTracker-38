import { useEffect, useContext } from 'react';
import io from 'socket.io-client';
// import { getItemById } from './utils/utils';
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
      payload.id = +payload.id;
      labelDispatch({ type, payload });
    });

    socket.on('user', ({ type, payload }) => {
      payload.id = +payload.id;
      userDispatch({ type, payload });
    });

    socket.on('issue', ({ type, payload }) => {
      console.log('Socket Payload', JSON.stringify(payload));
      console.log('Socket Payload', payload);
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
