import { VisibilityFilters } from '../actions';
import { LOAD_TEST_SUITES, SET_VISIBILITY_FILTER, TOGGLE_TESTSUITE } from '../constants/action-types';

export default function reducer(state = {
  name: 'Unit Test Report',
  testSuite: []
}, action) {
  switch (action.type) {
    // case SET_VISIBILITY_FILTER:
    // {
    //   return {
    //     ...state,
    //     visibilityFilter: action.payload,
    //     testSuite: action.payload === VisibilityFilters.HIDE_ALL ? state.testSuite.map(testCase => ({ ...testCase, hidden: true })) : 
    //     state.testSuite.map(testCase => ({ ...testCase, toggle: true })),
    //   };
    // }
    // case TOGGLE_TESTSUITE:
    // {
    //   return {
    //     ...state,
    //     testcase: state
    //       .testSuite
    //       .map((testCase, index) => {
    //         if (index === action.payload) {
    //           return {
    //             ...testCase,
    //             toggle: !testCase.toggle,
    //           };
    //         }
    //         return testcase;
    //       }),
    //   };
    // }
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
