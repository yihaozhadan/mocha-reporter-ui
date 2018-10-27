import { VisibilityFilters } from '../actions/testcaseActions';

export default function reducer(state = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  testcases: [],
}, action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER': {
      return { ...state, visibilityFilter: action.filter };
    }
    case 'TOGGLE_USECASE': {
      return {
        ...state,
        testcases: state.testcases.map(
          (testcase, index) => {
            if (index === action.index) {
              return { ...testcase, show: !testcase.show };
            }
            return testcase;
          },
        ),
      };
    }
    default: return state;
  }
}
