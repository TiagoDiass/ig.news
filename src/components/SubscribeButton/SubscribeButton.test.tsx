import { render, screen } from '@testing-library/react';
import SubscribeButton from '.';

jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false],
  };
});

describe('SubscribeButton component', () => {
  it('should render correctly', () => {
    render(<SubscribeButton />);

    expect(screen.getByRole('button', { name: /se inscreva já/i })).toBeInTheDocument();
  });
});
