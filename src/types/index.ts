import React from "react";

export interface GitHubUser {
  login: string;
  id: number;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
}

export interface UserState {
  users: GitHubUser[];
  repos: Repo[];
  reposLoading: Record<string, boolean>;
  usersLoading: boolean;
  error: string;
  selectedUser: string;
}

export interface GitHubExplorerProps {
  initialQuery?: string;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export interface UserAccordionProps {
  users: GitHubUser[];
  selectedUser: string;
  repos: Repo[];
  reposLoading: Record<string, boolean>;
  onSelect: (username: string) => void;
}

export interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'left';
}