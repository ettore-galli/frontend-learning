import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('test a element', () => {
  render(<App />);
  const linkElement = screen.getByText(/Selettore/i);
  expect(linkElement).toBeInTheDocument();
});
