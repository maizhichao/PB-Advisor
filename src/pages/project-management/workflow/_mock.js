const advancedOperation1 = [
  {
    key: 'project1',
    projectName: '北京项目 - WJ123456',
    number: 15,
    progress: 75,
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'project2',
    projectName: '上海项目 - A',
    number: 12,
    progress: 12,
    updatedAt: '2019-11-04  19:23:12',
    memo: '-',
  },
  {
    key: 'project3',
    projectName: '巴黎项目',
    number: 98,
    progress: 98,
    updatedAt: '2019-11-05  19:23:12',
    memo: '-',
  },
  {
    key: 'project4',
    projectName: '伦敦项目',
    number: 0,
    progress: 0,
    updatedAt: '2019-11-06  19:23:12',
    memo: '-',
  },
  {
    key: 'project5',
    projectName: '纽约项目',
    number: 0,
    progress: 0,
    updatedAt: '2019-11-07  19:23:12',
    memo: '-',
  },
  {
    key: 'project6',
    projectName: '武汉项目',
    number: 10,
    progress: 17,
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
];
const getProfileAdvancedData = {
  advancedOperation1,
};
export default {
  'GET  /api/profile/advanced': getProfileAdvancedData,
};
