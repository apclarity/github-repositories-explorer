import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GitHubUser, Repo, UserState } from '../types';

const initialState: UserState = {
  users: [],
  repos: [],
  reposLoading: {},
  usersLoading: false,
  error: '',
  selectedUser: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: (state, action: PayloadAction<string>) => {
      state.usersLoading = true
      state.error = '';
    },
    fetchUsersSuccess: (state, action: PayloadAction<GitHubUser[]>) => {
      state.usersLoading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.usersLoading = false;
      state.error = action.payload;
    },
    fetchReposRequest: (state, action: PayloadAction<string>) => {
      const username = action.payload
      state.reposLoading[username] = true
      state.error = '';
      state.repos = [];
    },
    fetchReposSuccess: (state, action: PayloadAction<Repo[]>) => {
      state.repos = action.payload;
      const username = state.selectedUser
      state.reposLoading[username] = false
    },
    fetchReposFailure: (state, action: PayloadAction<string>) => {
      const username = state.selectedUser
      state.reposLoading[username] = false
      state.error = action.payload;
    },
    selectUser: (state, action: PayloadAction<string>) => {
      state.selectedUser = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
      state.repos = [];
      state.selectedUser = '';
      state.error = '';
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchReposRequest,
  fetchReposSuccess,
  fetchReposFailure,
  selectUser,
  clearUsers
} = userSlice.actions;

export default userSlice.reducer;