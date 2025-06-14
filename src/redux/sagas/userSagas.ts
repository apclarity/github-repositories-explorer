import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchReposSuccess,
  fetchReposFailure,
} from '../userSlice';
import { GitHubUser, Repo } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/github';
import { USER_LIMIT } from '../../data/constant';

function fetchUsersAPI(query: string, perPage: number = USER_LIMIT) {
    return api.get('/search/users', {
        params: {
            q: query,
            per_page: perPage
        }
    })
}

function fetchReposAPI(username: string) {
    return api.get(`/users/${username}/repos`);
}

function* fetchUsersSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const res = yield call(fetchUsersAPI, action.payload);
    yield put(fetchUsersSuccess(res.data.items as GitHubUser[]));
  } catch (error) {
    yield put(fetchUsersFailure('Failed fetching users'));
  }
}

function* fetchReposSaga(action: PayloadAction<string>): Generator<any, void, any> {
  try {
    const res = yield call(fetchReposAPI, action.payload);
    yield put(fetchReposSuccess(res.data as Repo[]));
  } catch (error) {
    yield put(fetchReposFailure('Failed fetching repositories'));
  }
}

export function* userSaga() {
  yield takeLatest('user/fetchUsersRequest', fetchUsersSaga);
  yield takeLatest('user/fetchReposRequest', fetchReposSaga);
}
