import { queryProjectDetails } from './service';

const Model = {
  namespace: 'projectDetails',
  state: {
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },
  effects: {
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryProjectDetails);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },
  reducers: {
    show(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
