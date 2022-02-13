import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { VisibilityFilters } from './actions';
import testCaseReducer from './reducers';

const middleware = applyMiddleware(promise, thunk, logger);
const testSuitesInitialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  testSuites: {
    name: 'Unit Test Report',
    testSuite: []
  }
};

export function initializeStore(initialState = testSuitesInitialState) {
  return createStore(testCaseReducer, initialState, composeWithDevTools(middleware));
}
