import SignInButton from '.';
import { screen, render } from '@testing-library/react';

jest.mock('next-auth/client', () => {
  return {
    useSession: jest
      .fn()
      .mockImplementationOnce(() => [null, false])
      .mockImplementationOnce(() => [{ user: { name: 'Tiago Dias' } }, true]),
  };
});

describe('SignInButton component', () => {
  it('should render correctly when user is not logged in', () => {
    render(<SignInButton />);
    expect(screen.getByRole('button', { name: /login com github/i })).toBeInTheDocument();
  });

  it('should render correctly when user is logged in', () => {
    render(<SignInButton />);
    expect(screen.queryByRole('button', { name: /login com github/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tiago dias/i })).toBeInTheDocument();
  });
});
