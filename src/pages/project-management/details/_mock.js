const advancedOperation1 = [
  {
    key: 'op1',
    type: '钣金',
    number: '15小时',
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '框架',
    number: '12小时',
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op3',
    type: '铜排',
    number: '98小时',
    status: 'error',
    updatedAt: '2019-11-03  19:23:12',
    memo: '铜排设备线路短路，急需排查',
  },
  {
    key: 'op4',
    type: '一次',
    number: '-',
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op5',
    type: '二次',
    number: '-',
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op6',
    type: '测试',
    number: '-',
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
];
const getProfileAdvancedData = {
  advancedOperation1,
};
export default {
  'GET  /api/project/details': getProfileAdvancedData,
};
