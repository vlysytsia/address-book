import { testSaga } from "redux-saga-test-plan";
import { users } from "../../mocks/users";
import { LOAD_USERS_PER_FETCH } from "../../constats";
import { selectNationality } from "../settings";
import userSaga, { loadUsersSaga, fetchUsersSaga } from "./sagas";
import {
  LOAD_USERS,
  selectPage,
  fetchUsers,
  selectPrefetchUsers,
  fetchUsersSuccess,
  prefetchUsersSuccess,
  mergePreFetchUsers,
  fetchUsersError
} from "./index";

describe("user saga test", () => {
  const [fetchedUser, preFetchedUser] = users;

  it("userSaga", () => {
    testSaga(userSaga)
      .next()
      .takeLatest(LOAD_USERS, loadUsersSaga)

      .next()
      .isDone();
  });

  describe("loadUsersSaga", () => {
    it("should fetch users and prefetch next users", () => {
      const emptyPrefetchedUsers = [];
      testSaga(loadUsersSaga)
        .next()
        .select(selectPrefetchUsers)

        .next(emptyPrefetchedUsers)
        .call(fetchUsersSaga)

        .next([fetchedUser])
        .put(fetchUsersSuccess([fetchedUser]))

        .next()
        .call(fetchUsersSaga)

        .next([preFetchedUser])
        .put(prefetchUsersSuccess([preFetchedUser]))

        .next()
        .isDone();
    });

    it("should merge prefetched users and prefetch new one", () => {
      testSaga(loadUsersSaga)
        .next()
        .select(selectPrefetchUsers)

        .next([preFetchedUser])
        .put(mergePreFetchUsers([preFetchedUser]))

        .next()
        .call(fetchUsersSaga)

        .next([fetchedUser])
        .put(prefetchUsersSuccess([fetchedUser]))

        .next()
        .isDone();
    });
  });

  describe("fetchUsersSaga", () => {
    const nationality = "CH";
    const page = 1;

    const apiUrl = `https://randomuser.me/api/?results=${LOAD_USERS_PER_FETCH}&page=${page + 1}&nat=${nationality}`;
    const users = [{ id: 1 }];
    const response = {
      text: () => JSON.stringify(users)
    };

    it("should fetch new users", () => {
      testSaga(fetchUsersSaga)
        .next()
        .put(fetchUsers())

        .next()
        .select(selectNationality)

        .next(nationality)
        .select(selectPage)

        .next(page)
        .call(fetch, apiUrl)

        .next(response)
        .call([response, "text"])

        .next(JSON.stringify(users))
        .returns(users);
    });

    it("should handle error", () => {
      testSaga(fetchUsersSaga)
        .next()
        .put(fetchUsers())

        .next()
        .select(selectNationality)

        .next(nationality)
        .select(selectPage)

        .next(page)
        .call(fetch, apiUrl)

        .throw(new Error())
        .put(fetchUsersError())

        .next()
        .isDone();
    });
  });
});
