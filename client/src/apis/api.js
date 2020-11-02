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
      method: 'get',
      header: { Authorization: 'Bearer ~' },
    };
    const issues = await customFetch(url, request);
    return issues;
  },
  async update(data) {
    const url = `${baseURL}/issue`;
    const request = {
      method: 'patch',
      header: { Authorization: 'Bearer ~' },
      body: JSON.stringify(data),
    };
    const result = await customFetch(url, request);
    return result;
  },
};

export const milestoneAPI = {
  async readAll() {
    const url = `${baseURL}/milestone`;
    const request = {
      method: 'get',
      header: { Authorization: 'Bearer ~' },
    };
    const milestones = await customFetch(url, request);
    return milestones;
  },
};

export const labelAPI = {
  async readAll() {
    const url = `${baseURL}/label`;
    const request = {
      method: 'get',
      header: { Authorization: 'Bearer ~' },
    };
    const labels = await customFetch(url, request);
    return labels;
  },
};

export const userAPI = {
  async readAll() {
    const url = `${baseURL}/user`;
    const request = {
      method: 'get',
      header: { Authorization: 'Bearer ~' },
    };
    const users = await customFetch(url, request);
    return users;
  },
};
