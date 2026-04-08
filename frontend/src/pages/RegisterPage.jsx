import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.fullName
      );
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
            <p className="text-gray-400 mt-2">Create your account</p>
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-dark-700 border border-dark-600 rounded px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full bg-dark-700 border border-dark-600 rounded px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-dark-700 border border-dark-600 rounded px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-red-600"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Password must be 8+ characters with uppercase and number
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition mt-6"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-gray-400 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-red-500 hover:text-red-400 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
