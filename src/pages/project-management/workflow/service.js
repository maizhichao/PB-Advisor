import request from '@/utils/request';

export async function queryProjectWorkflow() {
  return request('/api/project/workflow');
}
