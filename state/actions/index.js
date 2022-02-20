import _ from 'lodash';
import { actionTypes } from '../constants';
const { SET_VISIBILITY_FILTER, TOGGLE_TESTSUITE, LOAD_TEST_SUITES } = actionTypes;

export function setVisibilityFilter(filter) {
  return (dispatch) => {
    dispatch({ type: SET_VISIBILITY_FILTER, payload: filter });
  };
}

export function toggleTestSuite(index) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_TESTSUITE, payload: index });
  };
}

export function loadTestSuites(testSuites) {
  return (dispatch) => {
    dispatch({
      type: LOAD_TEST_SUITES,
      payload: {
        title: _.get(testSuites, 'name[0]', 'Empty'),
        testSuite: _.get(testSuites, 'testsuite', [])
      }
    });
  };
}
