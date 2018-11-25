import { LOAD_TEST_SUITES, SET_VISIBILITY_FILTER, TOGGLE_TESTSUITE } from '../constants/action-types';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  HIDE_ALL: 'HIDE_ALL',
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  SHOW_FAILURE: 'SHOW_FAILURE',
  SHOW_SKIPPED: 'SHOW_SKIPPED',
};

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, payload: filter };
}

export function toggleTestSuite(index) {
  return {
    type: TOGGLE_TESTSUITE,
    payload: index,
  };
}

export function loadTestSuites(testSuites) {
  return {
    type: LOAD_TEST_SUITES,
    payload: { name: testSuites.name[0], testSuite: testSuites.testsuite },
  };
}
