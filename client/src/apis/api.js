const customFetch = async (url, request) => {
  try {
    const res = await fetch(url, request);
    const status = await res.status;
    if (status >= 500) throw new Error('Server error');
    if (status >= 400) throw new Error('Client error');
    return res.json();
  } catch (err) {
    return null;
  }
};

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

export const issueAPI = {
  async readAll() {
    const url = `${baseURL}/issue`;
    const request = {
      method: 'GET',
      headers: { Authorization: 'Bearer ~' },
    };
    const issues = await customFetch(url, request);
    return issues;
  },
  async update(data) {
    const url = `${baseURL}/issue`;
    const request = {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ~',
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
        Authorization: 'Bearer ~',
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
        Authorization: 'Bearer ~',
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
      headers: { Authorization: 'Bearer ~' },
    };
    const milestones = await customFetch(url, request);
    return milestones;
  },
};

export const labelAPI = {
  async readAll() {
    const url = `${baseURL}/label`;
    const request = {
      method: 'GET',
      headers: { Authorization: 'Bearer ~' },
    };
    const labels = await customFetch(url, request);
    return labels;
  },
};

export const userAPI = {
  async readAll() {
    const url = `${baseURL}/user`;
    const request = {
      method: 'GET',
      headers: { Authorization: 'Bearer ~' },
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
        Authorization: 'Bearer ~',
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
      headers: { Authorization: 'Bearer ~' },
    };
    const comments = await customFetch(url, request);
    return comments;
  },
  async update(data) {
    const url = `${baseURL}/comment`;
    const request = {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ~',
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
