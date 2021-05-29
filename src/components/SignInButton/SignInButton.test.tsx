import SignInButton from '.';
import { screen, render } from '@testing-library/react';
import nextAuthClient from 'next-auth/client';

const useSessionMock = jest.spyOn(nextAuthClient, 'useSession');

describe('SignInButton component', () => {
  it('should render correctly when user is not logged in', () => {
    useSessionMock.mockReturnValue([null, false]);
    render(<SignInButton />);
    expect(screen.getByRole('button', { name: /login com github/i })).toBeInTheDocument();
  });

  it('should render correctly when user is logged in', () => {
    useSessionMock.mockReturnValue([{ user: { name: 'John Doe' } }, true]);
    render(<SignInButton />);
    expect(screen.queryByRole('button', { name: /login com github/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /john doe/i })).toBeInTheDocument();
  });
});
