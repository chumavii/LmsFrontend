import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get('userId') ?? '';
  const token = searchParams.get('token') ?? '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.message || 'Password reset failed');
      }

      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="h2">Reset Password</h2>
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        {success && <p className="text-xs text-teal-500 mb-2">{success}</p>}

        <p className="input-title">New Password</p>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
          className="text-input"
        />

        <p className="input-title">Confirm New Password</p>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
          className="text-input"
        />

        <button type="submit" className="btn-primary border-1 border-[#4e8ccf63]">
          Reset Password
        </button>

        <div className="mt-4 text-center text-xs">
          <Link to="/login" className="underline text-blue-400 hover:text-blue-600">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
