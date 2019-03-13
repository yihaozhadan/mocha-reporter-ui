import { combineReducers } from 'redux';

import testSuites from './testSuites';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  testSuites,
  visibilityFilter
});
