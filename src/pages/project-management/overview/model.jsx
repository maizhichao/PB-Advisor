import {
  fakeChartData,
  queryFakeList,
  removeFakeList,
  updateFakeList,
  addFakeList,
} from './service';

const initState = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
  list: [],
};
const Model = {
  namespace: 'projectOverview',
  state: initState,
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *appendFetchList({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submitList({ payload }, { call, put }) {
      let callback;

      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clear() {
      return initState;
    },
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
