import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  fetchUsersRequest,
  fetchReposRequest,
  selectUser,
  clearUsers,
} from '../redux/userSlice';
import Input from '../components/atoms/Input';
import UserAccordion from '../components/molecules/UserAccordion';
import Loader from '../components/atoms/Loader';
import Tooltip from '../components/atoms/Tooltip';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  usernameRepoSchema,
  UsernameRepoSchema,
} from '../validation/usernameRepoSchema';
import { GitHubExplorerProps } from '../types';

const GitHubExplorer = ({ initialQuery = '' }: GitHubExplorerProps) => {
  const [executedQuery, setExecutedQuery] = useState(initialQuery);

  const dispatch = useAppDispatch();
  const {
    users,
    repos,
    usersLoading,
    error,
    selectedUser,
    reposLoading,
  } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UsernameRepoSchema>({
    resolver: zodResolver(usernameRepoSchema),
  });

  const onSubmit = (data: UsernameRepoSchema) => {
    const trimmed = data.username.trim();
    if (!trimmed || trimmed === executedQuery) return;

    setExecutedQuery(trimmed);
    dispatch(fetchUsersRequest(trimmed));
  };

  const handleClear = () => {
    reset();
    setExecutedQuery('');
    dispatch(clearUsers());
  };

  const handleSelectUser = (username: string) => {
    dispatch(selectUser(username));
    dispatch(fetchReposRequest(username));
  };

  return (
    <div className="p-3 w-full md:max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-center">
        GitHub Repositories Explorer
      </h1>

      <div>
        <form
          className="w-full mx-auto grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 mb-4 min-w-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register('username')}
            placeholder="Enter username"
            className={`border ${errors.username ? 'border-red-500' : ''}`}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 col-span-1"
          >
            Search
          </button>
        </form>
      </div>

      {errors.username && (
        <p className="text-red-500 text-sm w-full max-w-md md:w-[400px]">
          {errors.username.message}
        </p>
      )}

      {executedQuery && users.length > 0 && (
        <div className="flex items-center justify-between py-5">
          <p>
            Showing users for "
            <span className="font-medium">{executedQuery}</span>"
          </p>
          <div className="relative group ml-4">
            <Tooltip text="Clear search" position="left">
              <button
                onClick={handleClear}
                className="ml-4 text-sm text-gray-600 py-1 px-2 bg-gray-200 rounded hover:text-red-600 hover:border-red-600 hover:bg-red-200 hover:py-1 hover:px-2 transition"
                aria-label="Clear search"
              >
                ✕
              </button>
            </Tooltip>
          </div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {usersLoading ? (
        <Loader />
      ) : users.length === 0 && executedQuery ? (
        <p className="text-gray-500 text-sm text-center mt-4">
          Username not found.
        </p>
      ) : (
        <UserAccordion
          users={users}
          selectedUser={selectedUser}
          repos={repos}
          reposLoading={reposLoading}
          onSelect={handleSelectUser}
        />
      )}
    </div>
  );
};

export default GitHubExplorer;
