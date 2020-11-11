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
    removeUserInfo();
    return;
  }
  if (status >= 500) throw new Error('Server error');
  if (status >= 400) throw new Error('Client error');

  const { accessToken } = await result.json();
  localStorage.setItem('accessToken', accessToken);
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

export const issueAPI = {
  async readAll() {
    const url = `${baseURL}/issue`;
    const request = {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    };
    const issues = await customFetch(url, request);
    return issues;
  },
  async update(data) {
    const url = `${baseURL}/issue`;
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
    const url = `${baseURL}/issue`;
    const request = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIssue),
    };
    const result = await customFetch(url, request);
    return result;
  },
};

export const milestoneAPI = {
  async readAll() {
    const url = `${baseURL}/milestone`;
    const request = {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    };
    const milestones = await customFetch(url, request);
    return milestones;
  },
};

export const labelAPI = {
  async create() {
    const url = `${baseURL}/label`;
    const request = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    };
    const result = await customFetch(url, request);
    return result;
  },
  async readAll() {
    const url = `${baseURL}/label`;
    const request = {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    };
    const labels = await customFetch(url, request);
    return labels;
  },
  async update() {
    const url = `${baseURL}/label`;
    const request = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    };
    const result = await customFetch(url, request);
    return result;
  },
  async remove() {
    const url = `${baseURL}/label`;
    const request = {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    };
    const result = await customFetch(url, request);
    return result;
  },
};

export const userAPI = {
  async readAll() {
    const url = `${baseURL}/user`;
    const request = {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    };
    const users = await customFetch(url, request);
    return users;
  },
};

export const commentAPI = {
  async create(data) {
    const url = `${baseURL}/comment`;
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
    const url = `${baseURL}/comment`;
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
