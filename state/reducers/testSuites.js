import { actionTypes } from '../constants';

export default function reducer(
  state = {
    title: 'Unit Test Report',
    testSuite: []
  },
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_TEST_SUITES: {
      return {
        ...state,
        title: action.payload.title,
        testSuite: action.payload.testSuite
      };
    }
    default:
      return state;
  }
}
