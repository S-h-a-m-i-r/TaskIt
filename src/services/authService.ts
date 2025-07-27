import { request } from './request';

export const loginUser = (credentials) => {
  return request({
    method: 'post',
    url: '/auth/login',
    data: credentials,
  });
};

export const registerUser = (credentials) => {
  return request({
    method: 'post',
    url: '/auth/register',
    data: credentials,
  });
};