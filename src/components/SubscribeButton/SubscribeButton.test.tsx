import SubscribeButton from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { mocked } from 'ts-jest/utils';

// mocks
jest.mock('next-auth/client');
jest.mock('next/router');

const getSubscribeButton = () => screen.getByRole('button', { name: /se inscreva já/i });

describe('SubscribeButton component', () => {
  beforeEach(jest.clearAllMocks);

  it('should render correctly', () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValue([null, false]);
    render(<SubscribeButton />);
    expect(getSubscribeButton()).toBeInTheDocument();
  });

  it('should should sign in when user is not logged in', () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValue([null, false]); // user is not logged in
    render(<SubscribeButton />);

    const button = getSubscribeButton();
    userEvent.click(button);

    expect(signIn).toHaveBeenCalledWith('github');
  });

  it('should redirect to /posts when user is already subscribed', () => {
    const useSessionMock = mocked(useSession);
    useSessionMock.mockReturnValue([
      { user: { name: 'John Doe' }, activeSubscription: 'fake-active-subscription' },
      false,
    ]); // user is logged in and subscribed

    const useRouterMock = mocked(useRouter);
    const routerPushMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: routerPushMock,
    } as any); // with "as any", we'll not have to mock every single method of a NextRouter

    render(<SubscribeButton />);

    const button = getSubscribeButton();
    userEvent.click(button);

    expect(routerPushMock).toHaveBeenCalledWith('/posts');
  });
});
