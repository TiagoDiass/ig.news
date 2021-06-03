import Home from 'pages';
import { render, screen } from '@testing-library/react';
import nextAuthClient from 'next-auth/client';

jest.spyOn(nextAuthClient, 'useSession').mockReturnValue([null, false]);

describe('Home page', () => {
  beforeEach(jest.clearAllMocks);

  it('should render correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$ 23,50' }} />);

    expect(screen.getByText(/R\$ 23,50/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /se inscreva já/i,
      })
    ).toBeInTheDocument();
  });
});
