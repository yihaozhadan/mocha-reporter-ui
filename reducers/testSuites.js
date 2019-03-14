import { LOAD_TEST_SUITES } from '../constants/action-types';

export default function reducer(state = {
  name: 'Unit Test Report',
  testSuite: []
}, action) {
  switch (action.type) {
    case LOAD_TEST_SUITES:
    {
      return {
        ...state,
        name: action.payload.name,
        testSuite: action.payload.testSuite,
      };
    }
    default:
      return state;
  }
}
