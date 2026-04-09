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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center px-4 transition-colors duration-300 pb-10 pt-10">
      <div className="w-full max-w-md relative z-10">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl blur opacity-20 dark:opacity-40 animate-pulse"></div>

        <div className="bg-white dark:bg-dark-800 rounded-xl p-8 border border-gray-200 dark:border-dark-700 shadow-2xl relative">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-neon-purple/20 border-2 border-neon-purple rounded flex items-center justify-center mb-4 mx-auto shadow-[0_0_15px_rgba(188,19,254,0.4)]">
              <span className="text-neon-purple font-bold text-2xl">▶</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-widest">IMSS</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Create your account</p>
          </div>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-600 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="text-red-500 mt-0.5" size={20} />
              <p className="text-red-700 dark:text-red-200 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-neon-purple transition-colors" size={20} />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg px-4 py-2.5 pl-10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-neon-purple focus:shadow-[0_0_10px_rgba(188,19,254,0.3)] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Username</label>
              <div className="relative group">
                <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-neon-cyan transition-colors" size={20} />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg px-4 py-2.5 pl-10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-neon-cyan transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg px-4 py-2.5 pl-10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-neon-purple transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg px-4 py-2.5 pl-10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-neon-purple focus:shadow-[0_0_10px_rgba(188,19,254,0.3)] transition-all"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                Password must be 8+ characters with uppercase and number
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neon-purple to-neon-purple/80 hover:from-neon-purple hover:to-neon-purple disabled:from-gray-400 disabled:text-gray-200 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(188,19,254,0.4)] hover:shadow-[0_0_25px_rgba(188,19,254,0.6)] transition-all mt-8 tracking-wide relative overflow-hidden"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              <div className="absolute inset-0 bg-white/20 w-ful h-full -skew-x-12 -translate-x-full hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          </form>

          <p className="text-gray-500 dark:text-gray-400 text-center mt-6 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-neon-cyan hover:text-neon-purple font-bold hover:underline transition-colors drop-shadow-[0_0_2px_rgba(0,243,255,0.8)]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
