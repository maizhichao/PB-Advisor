import request from '@/utils/request';

export async function queryProjectDetails() {
  return request('/api/project/details');
}
