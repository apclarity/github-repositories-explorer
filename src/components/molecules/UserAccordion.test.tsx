import { render, screen, fireEvent } from '@testing-library/react';
import UserAccordion from './UserAccordion';

const users = [{ id: 1, login: 'john' }];
const repos = [{ id: 1, name: 'repo1', stargazers_count: 5, description: 'description' }];
const mockSelect = jest.fn();

describe('UserAccordion', () => {
  it('renders user and toggles accordion', () => {
    render(
      <UserAccordion
        users={users}
        selectedUser=""
        repos={[]}
        reposLoading={{}}
        onSelect={mockSelect}
      />
    );

    const button = screen.getByText('john');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockSelect).toHaveBeenCalledWith('john');
  });

  it('shows loading when reposLoading is true', () => {
    render(
      <UserAccordion
        users={users}
        selectedUser="john"
        repos={[]}
        reposLoading={{ john: true }}
        onSelect={() => {}}
      />
    );
    fireEvent.click(screen.getByText('john'));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows repos when available', () => {
    render(
      <UserAccordion
        users={users}
        selectedUser="john"
        repos={repos}
        reposLoading={{ john: false }}
        onSelect={() => {}}
      />
    );
    fireEvent.click(screen.getByText('john'));
    expect(screen.getByText('repo1')).toBeInTheDocument();
  });
});
