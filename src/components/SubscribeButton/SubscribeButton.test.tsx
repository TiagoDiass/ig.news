import SubscribeButton from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nextAuthClient from 'next-auth/client';

// mocks
const useSessionMock = jest.spyOn(nextAuthClient, 'useSession');
jest.spyOn(nextAuthClient, 'signIn').mockResolvedValue({ ok: true });

const getSubscribeButton = () => screen.getByRole('button', { name: /se inscreva já/i });

describe('SubscribeButton component', () => {
  it('should render correctly', () => {
    useSessionMock.mockImplementation(() => [null, false]);
    render(<SubscribeButton />);
    expect(getSubscribeButton()).toBeInTheDocument();
  });

  it('should should sign in when user is not logged in', () => {
    useSessionMock.mockImplementation(() => [null, false]); // user is not logged in
    render(<SubscribeButton />);

    const button = getSubscribeButton();
    userEvent.click(button);

    expect(nextAuthClient.signIn).toHaveBeenCalledWith('github');
  });
});
