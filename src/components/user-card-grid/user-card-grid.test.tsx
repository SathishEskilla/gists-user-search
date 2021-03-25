import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCardGrid from './user-card-grid';

test('renders learn react link', () => {
  render(<UserCardGrid resultItemsList={[]}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
