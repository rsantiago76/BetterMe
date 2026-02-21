import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { useAuth } from '../../contexts/auth-context';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, name);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-[#111827] border-b border-[#6B7280]/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <Link to="/" className="text-[#6B7280] hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Register Form */}
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-lg border border-[#6B7280]/20 p-8">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Create Account</h1>
          <p className="text-[#6B7280] mb-8">Start your fitness journey with BetterMe</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#111827] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#6B7280]/20 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#6B7280]/20 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#111827] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#6B7280]/20 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                placeholder="••••••••"
              />
              <p className="text-xs text-[#6B7280] mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#111827] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-[#6B7280]/20 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <BetterButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </BetterButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B7280]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#22C55E] hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="mt-8 p-4 bg-[#22C55E]/10 rounded-lg border border-[#22C55E]/20">
            <p className="text-sm text-[#111827]">
              <strong>Demo Mode:</strong> Backend APIs not connected yet. See{' '}
              <code className="bg-[#111827] text-[#22C55E] px-2 py-1 rounded text-xs">
                DEPLOYMENT.md
              </code>{' '}
              to connect your database and enable authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
