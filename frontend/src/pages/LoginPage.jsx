import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-dark-800 rounded-lg p-8 border border-dark-700">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-red-600 rounded mx-auto flex items-center justify-center mb-4">
              <span className="text-white font-bold text-2xl">▶</span>
            </div>
            <h1 className="text-2xl font-bold text-white">IMSS</h1>
            <p className="text-gray-400 mt-2">Login to your account</p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-dark-700 border border-dark-600 rounded px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-dark-700 border border-dark-600 rounded px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition mt-6"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-red-500 hover:text-red-400 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
