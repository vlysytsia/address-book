import { createSelector } from "reselect";
import { createAction } from "../../helpers";
import { MAX_USERS_LOAD } from "../../constats";
import { CHANGE_SETTINGS_VALUE } from "../settings";

// actions
export const LOAD_USERS = "LOAD_USERS";
export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const MERGE_PRE_FETCH_USERS = "MERGE_PRE_FETCH_USERS";
export const PRE_FETCH_USERS_SUCCESS = "PRE_FETCH_USERS_SUCCESS";
export const CHANGE_FILTER_VALUE = "CHANGE_FILTER_VALUE";
export const SET_ACTIVE_USER = "SET_ACTIVE_USER";

// actions creators
export const loadUsers = createAction(LOAD_USERS);
export const fetchUsers = createAction(FETCH_USERS);
export const setActiveUser = createAction(SET_ACTIVE_USER);
export const changeFilterValue = createAction(CHANGE_FILTER_VALUE);
export const fetchUsersError = createAction(FETCH_USERS_ERROR);
export const fetchUsersSuccess = createAction(FETCH_USERS_SUCCESS);
export const mergePreFetchUsers = createAction(MERGE_PRE_FETCH_USERS);
export const prefetchUsersSuccess = createAction(PRE_FETCH_USERS_SUCCESS);

export const initialState = {
  loading: false,
  users: [],
  showError: false,
  prefetchedUsers: [],
  page: 0,
  loaded: false,
  filterValue: "",
  activeUser: null
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: action.payload
      };
    case FETCH_USERS:
      return {
        ...state,
        loading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        showError: false,
        loaded: true,
        users: [...state.users, ...action.payload.results],
        ...action.payload.info
      };
    case MERGE_PRE_FETCH_USERS:
      return {
        ...state,
        users: [...state.users, ...state.prefetchedUsers],
        prefetchedUsers: []
      };
    case PRE_FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        showError: false,
        loaded: true,
        prefetchedUsers: action.payload.results,
        ...action.payload.info
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        showError: true,
        loading: false
      };
    case CHANGE_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload
      };
    case CHANGE_SETTINGS_VALUE:
      return initialState;
    default:
      return state;
  }
};

// selectors
const selectError = state => state.users.showError;
export const selectLoaded = state => state.users.loaded;
export const selectUsers = state => state.users.users;
export const selectLoading = state => state.users.loading;
export const selectPage = state => state.users.page;
export const selectFilterValue = state => state.users.filterValue;
export const selectPrefetchUsers = state => state.users.prefetchedUsers;
export const selectActiveUserId = state => state.users.activeUser;

export const selectFilteredUsers = createSelector(selectUsers, selectFilterValue, (users, filterValue) =>
  users.filter(({ name }) => `${name.first}${name.last}`.toLowerCase().includes(filterValue.toLowerCase()))
);

export const selectActiveUser = createSelector(selectUsers, selectActiveUserId, (users, id) =>
  users.find(user => user.login.uuid === id)
);

export const selectIsShowNoResults = createSelector(
  selectLoaded,
  selectLoading,
  selectError,
  selectFilteredUsers,
  (loaded, loading, error, users) => loaded && !loading && !error && users.length === 0
);

export const selectIsShowError = createSelector(selectLoading, selectError, (loading, error) => !loading && error);
export const selectIsLoadingAvailabel = createSelector(selectUsers, users => users.length < MAX_USERS_LOAD);

export default reducer;
