import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Book a movie/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByText('We are glad you\'re here, Welcome!.')).toBeInTheDocument();
});
