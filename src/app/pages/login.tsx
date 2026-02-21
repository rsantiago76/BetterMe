import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { useAuth } from '../../contexts/auth-context';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
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

      {/* Login Form */}
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-white rounded-lg border border-[#6B7280]/20 p-8">
          <h1 className="text-3xl font-bold text-[#111827] mb-2">Welcome Back</h1>
          <p className="text-[#6B7280] mb-8">Sign in to access your BetterMe account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
            </div>

            <BetterButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </BetterButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#6B7280]">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#22C55E] hover:underline font-medium">
                Create Account
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
