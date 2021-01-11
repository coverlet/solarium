import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { EValidatorsSort } from '../../../redux/types';
import { ValidatorsSortLabel, IProps } from '../validators-sort-label';

const clickMock = jest.fn();

const props: IProps = {
  label: 'LABEL',
  onClick: clickMock,
  sort: {
    by: EValidatorsSort.fee,
    direction: 'asc',
  },
  sorter: EValidatorsSort.score,
};

afterEach(cleanup);

describe('footer components', () => {
  it('renders', () => {
    const { asFragment } = render(<ValidatorsSortLabel {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays icon', () => {
    let rendered = render(<ValidatorsSortLabel {...props} sorter={EValidatorsSort.fee} />);
    expect(rendered.asFragment()).toMatchSnapshot();
    rendered = render(
      <ValidatorsSortLabel
        {...props}
        sorter={EValidatorsSort.fee}
        sort={{ ...props.sort, direction: 'desc' }}
      />
    );
    expect(rendered.asFragment()).toMatchSnapshot();
  });

  it('calls on click function', () => {
    render(<ValidatorsSortLabel {...props} />);
    const button = screen.getByRole('link', { name: /label/i });
    fireEvent.click(button);

    expect(clickMock).toBeCalled();
  });
});
