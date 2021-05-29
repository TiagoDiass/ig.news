import SignInButton from '.';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nextAuthClient from 'next-auth/client';

const useSessionMock = jest.spyOn(nextAuthClient, 'useSession');
jest.spyOn(nextAuthClient, 'signOut').mockResolvedValue({ url: '' });
jest.spyOn(nextAuthClient, 'signIn').mockResolvedValue({ ok: true });

describe('SignInButton component', () => {
  it('should render correctly when user is not logged in', () => {
    useSessionMock.mockReturnValue([null, false]);
    render(<SignInButton />);
    expect(screen.getByRole('button', { name: /login com github/i })).toBeInTheDocument();
  });

  it('should render correctly when user is logged in', () => {
    useSessionMock.mockReturnValue([{ user: { name: 'John Doe' } }, false]);
    render(<SignInButton />);
    expect(screen.queryByRole('button', { name: /login com github/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /john doe/i })).toBeInTheDocument();
  });

  it('should call signIn() when user is not logged in and click on the button', () => {
    useSessionMock.mockReturnValue([null, false]);
    render(<SignInButton />);
    const button = screen.getByRole('button', { name: /login com github/i });
    userEvent.click(button);
    expect(nextAuthClient.signIn).toHaveBeenCalledWith('github');
  });

  it('should call signOut() when user is logged in and click on the button', () => {
    useSessionMock.mockReturnValue([{ user: { name: 'John Doe' } }, false]);
    render(<SignInButton />);

    const button = screen.getByRole('button', { name: /john doe/i });

    userEvent.click(button);
    expect(nextAuthClient.signOut).toHaveBeenCalled();
  });
});
