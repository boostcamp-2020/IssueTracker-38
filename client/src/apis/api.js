import { removeUserInfo } from '../utils/utils';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

const getFreshAccessToken = async () => {
  const url = `${baseURL}/auth/fresh`;
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  };

  const result = await fetch(url, request);
  const status = await result.status;

  if (status === 401) {
    alert('세션이 만료되어 로그아웃 되었습니다.');
    removeUserInfo();
    return;
  }
  if (status >= 500) throw new Error('Server error');
  if (status >= 400) throw new Error('Client error');

  const { accessToken } = await result.json();
  localStorage.setItem('accessToken', accessToken);

  window.location.reload();
};

const customFetch = async (url, request) => {
  try {
    const res = await fetch(url, request);
    const status = await res.status;
    if (status === 401) await getFreshAccessToken();
    if (status >= 500) throw new Error('Server error');
    if (status >= 400) throw new Error('Client error');
    return res.json();
  } catch (err) {
    return null;
  }
};

const createData = async (path, data) => {
  const url = `${baseURL}/${path}`;
  const request = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const result = await customFetch(url, request);
  return result;
};

const readAllData = async (path) => {
  const url = `${baseURL}/${path}`;
  const request = {
    method: 'GET',
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
  };
  const result = await customFetch(url, request);
  return result;
};

const updateData = async (path, data) => {
  const url = `${baseURL}/${path}`;
  const request = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const result = await customFetch(url, request);
  return result;
};

const deleteData = async (path, id) => {
  const url = `${baseURL}/${path}`;
  const request = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  };
  const result = await customFetch(url, request);
  return result;
};

export const issueAPI = {
  async readAll() {
    return readAllData('issue');
  },
  async update(data) {
    return updateData('issue', data);
  },
  async markAll(isClosed, issueIds) {
    const url = `${baseURL}/issue/markall`;
    const request = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isClosed, issueIds }),
    };
    const result = await customFetch(url, request);
    return result;
  },
  async create(newIssue) {
    return createData('issue', newIssue);
  },
};

export const milestoneAPI = {
  async readAll() {
    return readAllData('milestone');
  },
};

export const labelAPI = {
  async create(newLabel) {
    return createData('label', newLabel);
  },
  async readAll() {
    return readAllData('label');
  },
  async update(data) {
    return updateData('label', data);
  },
  async remove(id) {
    return deleteData('label', id);
  },
};

export const userAPI = {
  async readAll() {
    return readAllData('user');
  },
};

export const commentAPI = {
  async create(newComment) {
    return createData('comment', newComment);
  },
  async readByIssue(issueId) {
    const url = `${baseURL}/comment?issueId=${issueId}`;
    const request = {
      method: 'get',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    };
    const comments = await customFetch(url, request);
    return comments;
  },
  async update(data) {
    return updateData('comment', data);
  },
};

export const oauthAPI = {
  async getAccessToken(code) {
    const url = `${baseURL}/auth`;
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    };
    const result = await customFetch(url, request);
    return result;
  },
};
