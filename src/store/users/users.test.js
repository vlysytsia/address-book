import { combineReducers } from "redux";
import { testReducer } from "../../helpers";
import { users as usersMock } from "../../mocks/users";
import users, {
  initialState,
  selectUsers,
  setActiveUser,
  selectFilteredUsers,
  selectActiveUserId,
  selectLoading,
  fetchUsers,
  fetchUsersSuccess,
  selectPrefetchUsers,
  selectPage,
  selectIsShowError,
  selectIsLoadingAvailabel,
  mergePreFetchUsers,
  prefetchUsersSuccess,
  fetchUsersError,
  selectFilterValue,
  changeFilterValue,
  selectActiveUser,
  selectIsShowNoResults,
  selectLoaded
} from "./index";
import { MAX_USERS_LOAD } from "../../constats";
import { changeSettingsValue } from "../settings";

const [fetchedUser, preFetchedUser] = usersMock;
const reducer = combineReducers({ users });

describe("users reducer", () => {
  const usersResponse = {
    results: [fetchedUser],
    info: { page: 1 }
  };

  const preFetchUsersResponse = {
    results: [preFetchedUser],
    info: { page: 2 }
  };

  it("should represent initial state", () => {
    expect(users(undefined, { type: "ANY" })).toEqual(initialState);
  });

  it("should handle set active user", () => {
    const uuid = "e3274b12-297e-4a99-9ea3-c6b6610e3a6b";
    testReducer(reducer, { users: { ...initialState, users: usersMock } })
      .expect(selectActiveUserId, null)
      .expect(selectActiveUser, undefined)
      .put(setActiveUser(uuid))
      .expect(selectActiveUserId, uuid)
      .expect(selectActiveUser, fetchedUser);
  });

  it("should show loading on fetchUsers", () => {
    testReducer(reducer)
      .expect(selectLoading, false)
      .put(fetchUsers())
      .expect(selectLoading, true);
  });

  it("should handle fetch users success", () => {
    const allUsers = Array.from(Array(MAX_USERS_LOAD)).map(() => fetchedUser);
    const allUserResponse = {
      results: allUsers,
      info: { page: 21 }
    };

    testReducer(reducer)
      .expect(selectLoaded, false)
      .expect(selectUsers, [])
      .expect(selectPage, 0)
      .put(fetchUsers())
      .expect(selectLoading, true)
      .put(fetchUsersSuccess(usersResponse))
      .expect(selectLoaded, true)
      .expect(selectLoading, false)
      .expect(selectUsers, [fetchedUser])
      .expect(selectPage, usersResponse.info.page)
      .expect(selectLoading, false)
      .expect(selectIsShowError, false)
      .expect(selectIsLoadingAvailabel, true)
      .put(fetchUsersSuccess(allUserResponse))
      .expect(selectIsLoadingAvailabel, false)
      .expect(selectIsShowNoResults, false);
  });

  it("should prefetched users", () => {
    testReducer(reducer)
      .put(fetchUsers())
      .expect(selectLoading, true)
      .expect(selectPrefetchUsers, [])
      .put(prefetchUsersSuccess(preFetchUsersResponse))
      .expect(selectPrefetchUsers, [preFetchedUser])
      .expect(selectLoading, false);
  });

  it("should merge prefetched users", () => {
    testReducer(reducer)
      .expect(selectUsers, [])
      .expect(selectPrefetchUsers, [])
      .put(fetchUsersSuccess(usersResponse))
      .expect(selectUsers, [fetchedUser])
      .put(prefetchUsersSuccess(preFetchUsersResponse))
      .expect(selectPrefetchUsers, [preFetchedUser])
      .put(mergePreFetchUsers(preFetchUsersResponse))
      .expect(selectUsers, [fetchedUser, preFetchedUser]);
  });

  it("should not represent error state on loading", () => {
    testReducer(reducer)
      .expect(selectIsShowError, false)
      .put(fetchUsersError())
      .expect(selectIsShowError, true)
      .put(fetchUsers())
      .expect(selectIsShowError, false);
  });

  it("should handle change filter value", () => {
    testReducer(reducer, { users: { ...initialState, users: usersMock, loaded: true } })
      .expect(selectFilteredUsers, usersMock)
      .expect(selectFilterValue, "")
      .expect(selectIsShowNoResults, false)
      .put(changeFilterValue("not exist user name"))
      .expect(selectFilterValue, "not exist user name")
      .expect(selectFilteredUsers, [])
      .expect(selectIsShowNoResults, true)
      .put(changeFilterValue("Stephan"))
      .expect(selectFilterValue, "Stephan")
      .expect(selectFilteredUsers, [fetchedUser]);
  });

  it("should reset state on change settings ", () => {
    expect(users({ ...initialState, someValue: true }, changeSettingsValue())).toEqual(initialState);
  });
});
