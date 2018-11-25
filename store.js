import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { VisibilityFilters } from './actions/testCaseActions';
import testCaseReducer from './reducers/testCaseReducer';

const middleware = applyMiddleware(promise(), thunk, createLogger());
const testSuitesInitialState = {
  name: 'Mocha Unit Test',
  visibilityFilter: VisibilityFilters.HIDE_ALL,
  testSuite: []
};

export function initializeStore(initialState = testSuitesInitialState) {
  return createStore(testCaseReducer, initialState, composeWithDevTools(middleware));
}
