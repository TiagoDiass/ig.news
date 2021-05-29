import SignInButton from '.';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nextAuthClient from 'next-auth/client';

const useSessionMock = jest.spyOn(nextAuthClient, 'useSession');
jest.spyOn(nextAuthClient, 'signOut').mockResolvedValue({ url: '' });
jest.spyOn(nextAuthClient, 'signIn').mockResolvedValue({ ok: true });

const getSignInButton = () => screen.queryByRole('button', { name: 'Login com Github' });
const getSignOutButton = () => screen.queryByRole('button', { name: 'John Doe' });

describe('SignInButton component', () => {
  it('should render correctly when user is not logged in', () => {
    useSessionMock.mockReturnValue([null, false]);
    render(<SignInButton />);
    expect(getSignInButton()).toBeInTheDocument();
  });

  it('should render correctly when user is logged in', () => {
    useSessionMock.mockReturnValue([{ user: { name: 'John Doe' } }, false]);
    render(<SignInButton />);
    expect(getSignInButton()).not.toBeInTheDocument();
    expect(getSignOutButton()).toBeInTheDocument();
  });

  it('should call signIn() when user is not logged in and click on the button', () => {
    useSessionMock.mockReturnValue([null, false]);
    render(<SignInButton />);
    const button = getSignInButton();
    userEvent.click(button);
    expect(nextAuthClient.signIn).toHaveBeenCalledWith('github');
  });

  it('should call signOut() when user is logged in and click on the button', () => {
    useSessionMock.mockReturnValue([{ user: { name: 'John Doe' } }, false]);
    render(<SignInButton />);

    const button = getSignOutButton();

    userEvent.click(button);
    expect(nextAuthClient.signOut).toHaveBeenCalled();
  });
});
