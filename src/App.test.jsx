import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('Plain-O 사이트를 렌더링한다', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    screen.getByRole('heading', { level: 1 });
  });
});
