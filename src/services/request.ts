import API from './api';

export const request = async ({ method = 'get', url, data = {}, params = {} }) => {
  try {
    const response = await API({ method, url, data, params });
    return response.data;
  } catch (error) {
    // optional: send to logging system like Sentry
    const message =
      error.response?.data?.message || error.message || 'Unexpected error occurred';
    throw new Error(message);
  }
};
