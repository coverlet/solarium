import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { SolFooter } from '../sol-footer';

// more info
// https://testing-library.com/docs/react-testing-library/example-intro
// https://www.leighhalliday.com/introduction-react-testing-library

afterEach(cleanup);

describe('footer components', () => {
  it('renders', () => {
    const { asFragment } = render(<SolFooter />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('contains text', () => {
    render(<SolFooter />);
    // screen.debug();
    expect(screen.getByText(/© 2021/i)).toBeInTheDocument();
  });
});
