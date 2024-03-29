import { visibilityFilters } from '../constants';

const visibilityFilter = (state = visibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.payload;
    default:
      return state;
  }
};

export default visibilityFilter;
