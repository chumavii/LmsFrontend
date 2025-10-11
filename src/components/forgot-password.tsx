import { useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || 'Failed to send password reset email');
      }

      setSuccess('If this email is registered, a password reset link has been sent.');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="h2">Forgot Password</h2>
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        {success && <p className="text-xs text-green-500 mb-2">{success}</p>}

        <p className="input-title">Email</p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="text-input"
        />

        <button type="submit" className="btn-primary border-1 border-[#4e8ccf63]">
          Send Reset Link
        </button>

        <p className="mt-4 text-xs text-center">
          Remembered your password?{' '}
          <Link to="/login" className="underline text-blue-400">
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
