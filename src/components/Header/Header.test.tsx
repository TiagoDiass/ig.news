import Header from '.';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => {
  return {
    useRouter: () => ({ asPath: '/' }),
  };
});

describe('Header component', () => {
  it('should render correctly', () => {
    render(<Header />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });
});
