import { put, takeLatest, call, select } from "redux-saga/effects";
import { selectNationality } from "../settings";
import { LOAD_USERS_PER_FETCH } from "../../constats";
import {
  selectPage,
  fetchUsersSuccess,
  fetchUsersError,
  prefetchUsersSuccess,
  LOAD_USERS,
  mergePreFetchUsers,
  selectPrefetchUsers,
  fetchUsers
} from "./index";

export function* fetchUsersSaga() {
  yield put(fetchUsers());
  const nationality = yield select(selectNationality);
  const page = yield select(selectPage);
  try {
    const apiUrl = `https://randomuser.me/api/?results=${LOAD_USERS_PER_FETCH}&page=${page + 1}&nat=${nationality}`;
    const response = yield call(fetch, apiUrl);
    const body = yield call([response, "text"]);
    const data = body.length ? JSON.parse(body) : {};
    return data;
  } catch (err) {
    console.error(err.message);
    yield put(fetchUsersError());
  }
}

export function* loadUsersSaga() {
  const prefetchedUsers = yield select(selectPrefetchUsers);

  if (prefetchedUsers.length) {
    yield put(mergePreFetchUsers(prefetchedUsers));
  } else {
    const users = yield call(fetchUsersSaga);
    yield put(fetchUsersSuccess(users));
  }

  const prefetchData = yield call(fetchUsersSaga);
  yield put(prefetchUsersSuccess(prefetchData));
}

function* userSaga() {
  yield takeLatest(LOAD_USERS, loadUsersSaga);
}

export default userSaga;
