import reducer, {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchReposRequest,
  fetchReposSuccess,
  selectUser,
  clearUsers
} from './userSlice';

import { GitHubUser, Repo, UserState } from '../types';

const initialState: UserState = {
  users: [],
  repos: [],
  reposLoading: {},
  usersLoading: false,
  error: '',
  selectedUser: '',
};

describe('userSlice', () => {
  it('should handle fetchUsersRequest', () => {
    const nextState = reducer(initialState, fetchUsersRequest('john'));
    expect(nextState.usersLoading).toBe(true);
    expect(nextState.error).toBe('');
  });

  it('should handle fetchUsersSuccess', () => {
    const users: GitHubUser[] = [{ id: 1, login: 'john' }];
    const nextState = reducer(initialState, fetchUsersSuccess(users));
    expect(nextState.users).toEqual(users);
    expect(nextState.usersLoading).toBe(false);
  });

  it('should handle fetchReposRequest and fetchReposSuccess', () => {
    const state = reducer(initialState, selectUser('john'));
    const loadingState = reducer(state, fetchReposRequest('john'));
    expect(loadingState.reposLoading['john']).toBe(true);

    const repos: Repo[] = [{ id: 1, name: 'repo1', stargazers_count: 10, description: 'description' }];
    const doneState = reducer(loadingState, fetchReposSuccess(repos));
    expect(doneState.repos).toEqual(repos);
    expect(doneState.reposLoading['john']).toBe(false);
  });

  it('should handle clearUsers', () => {
    const modified = { ...initialState, users: [{ id: 1, login: 'john' }], selectedUser: 'john' };
    const cleared = reducer(modified, clearUsers());
    expect(cleared.users).toEqual([]);
    expect(cleared.selectedUser).toBe('');
  });
});
