import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/login-form';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

// ✅ Correctly mock global fetch for the full URL
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn((url, options) => {
    if (
      url === 'https://localhost:8081/api/auth/login' &&
      options?.method === 'POST'
    ) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mock-token' }),
      });
    }
    return Promise.resolve({ ok: false });
  }));
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('renders login form and submits correctly', async () => {
  const handleLoginSuccess = vi.fn();

  render(
    <MemoryRouter>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </MemoryRouter>
  );

  // Fill in inputs
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });

  fireEvent.click(screen.getByRole('button', { name: /login/i }));

  // Wait for success callback to be called
  await waitFor(() => {
    expect(handleLoginSuccess).toHaveBeenCalledWith('mock-token');
  });
});
