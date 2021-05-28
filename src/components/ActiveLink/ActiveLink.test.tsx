import ActiveLink from '.';
import { render } from '@testing-library/react';

describe('ActiveLink component', () => {
  it('should render correctly', () => {
    const { debug } = render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    );
  });
});
