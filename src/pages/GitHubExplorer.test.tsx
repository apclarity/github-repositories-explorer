import { render, screen, fireEvent } from '@testing-library/react';
import GitHubExplorer from './GithubExplorer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from '../redux/userSlice';
import { UserState } from '../types'; 

const initialState: UserState = {
  users: [],
  repos: [],
  usersLoading: false,
  reposLoading: {},
  error: '',
  selectedUser: '',
};

const renderWithStore = (customState?: Partial<UserState>) => {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: {
      user: {
        ...initialState,
        ...customState,
      },
    },
  });

  return render(
    <Provider store={store}>
      <GitHubExplorer />
    </Provider>
  );
};

describe('GitHubExplorer Page', () => {
  it('renders title and input', () => {
    renderWithStore();

    expect(screen.getByText(/GitHub Repositories Explorer/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
  });

  it('shows validation error on empty submit', async () => {
    renderWithStore();

    fireEvent.click(screen.getByText(/Search/i));
    expect(await screen.findByText(/Username must be at least 3 characters long/i)).toBeInTheDocument();
  });

    it('displays "Username not found" when users is empty and search has been executed', () => {
    const store = configureStore({
        reducer: {
        user: userReducer,
        },
        preloadedState: {
        user: {
            ...initialState,
            users: [],
            usersLoading: false,
            error: '',
        },
        },
    });

   render(
  <Provider store={store}>
    <GitHubExplorer initialQuery="nouser" />
  </Provider>
);

expect(screen.getByText(/Username not found/i)).toBeInTheDocument();
    });
});
