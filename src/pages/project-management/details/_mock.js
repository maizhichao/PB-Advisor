const advancedOperation1 = [
  {
    key: 'op1',
    type: '钣金',
    number: 15,
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: '框架',
    number: 12,
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op3',
    type: '钢排',
    number: 98,
    status: 'error',
    updatedAt: '2019-11-03  19:23:12',
    memo: '钢排设备线路短路，急需排查',
  },
  {
    key: 'op4',
    type: '一次',
    number: 0,
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op5',
    type: '二次',
    number: 0,
    status: 'normal',
    updatedAt: '2019-11-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op6',
    type: '测试',
    number: 0,
    status: 'normal',
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
