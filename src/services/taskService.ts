import { request } from './request';

export const getAllTaskService = () => {
  return request({
    method: 'get',
    url: '/tasks',
  });
};

export const viewTaskService = (id: string) => {
  return request({
    method: 'get',
    url: `/tasks/viewTask/${id}`  });
};