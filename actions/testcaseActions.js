export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  HIDE_ALL: 'HIDE_ALL',
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  SHOW_FAILURE: 'SHOW_FAILURE',
  SHOW_SKIPPED: 'SHOW_SKIPPED',
};

export function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
}

export function toggleUsecase(index) {
  return {
    type: 'TOGGLE_USECASE',
    index,
  };
}
