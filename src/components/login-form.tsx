// src/components/LoginForm.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
}

function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok)
        throw new Error('Invalid credentials');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      onLoginSuccess(data.token);
      navigate('/'); // Redirect after successful login
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="form-div">
      <form onSubmit={handleSubmit} className='form'>
        <h2 className="h2">Login</h2>
        {error && <p className=" text-xs text-red-500 mb-2">{error}</p>}
        <p>Email</p>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="text-input"
        />
        <p>Password</p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="text-input"
        />
        <button type="submit" className="btn-primary">Login</button>
        <div className='text-xs p-6 text-center'>
          <p>Forgot password</p>
          <p>Don't have an account? <Link to="/signup" className='underline text-blue-400'>Sign up</Link></p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm