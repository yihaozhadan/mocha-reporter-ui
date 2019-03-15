import _ from 'lodash';
import { LOAD_TEST_SUITES, SET_VISIBILITY_FILTER, TOGGLE_TESTSUITE } from '../constants/action-types';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_SUCCESS_ONLY: 'SHOW_SUCCESS_ONLY',
  SHOW_FAILURE_ONLY: 'SHOW_FAILURE_ONLY',
  SHOW_SKIPPED_ONLY: 'SHOW_SKIPPED_ONLY',
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
    payload: { 
      name: _.get(testSuites, 'name[0]', 'Empty'),
      testSuite: _.get(testSuites, 'testsuite', [])
    },
  };
}
