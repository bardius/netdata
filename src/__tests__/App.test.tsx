import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';
import { render } from '../test-utils';

describe('Component - App', () => {
  it('should render with spinner', () => {
    const { asFragment } = render(<BrowserRouter><App /></BrowserRouter>);

    const linkElement = screen.getByRole(/progressbar/i);
    expect(linkElement).toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
