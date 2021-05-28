import ActiveLink from '.';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => {
  return {
    useRouter: () => ({ asPath: '/' }),
  };
});

describe('ActiveLink component', () => {
  it('should render correctly', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });

  it('should have the active class', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByRole('link', { name: /home/i })).toHaveClass('active');
  });

  it('should not have the active class', () => {
    render(
      <ActiveLink href='/test' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByRole('link', { name: /home/i })).not.toHaveClass('active');
  });
});
