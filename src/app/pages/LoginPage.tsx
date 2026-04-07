import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, this would call an API
    console.log('Form submitted:', { email, password, name });
    // Redirect to home after "login"
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-4xl font-bold">
              <span className="text-gray-900">shop</span>
              <span className="text-orange-400">.com</span>
            </div>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isSignUp ? 'Create account' : 'Sign in'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  placeholder="First and last name"
                  required={isSignUp}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                placeholder={isSignUp ? 'At least 6 characters' : 'Enter your password'}
                required
                minLength={6}
              />
              {!isSignUp && (
                <p className="text-xs text-gray-600 mt-1">
                  Passwords must be at least 6 characters.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-md font-bold transition"
            >
              {isSignUp ? 'Create your account' : 'Sign in'}
            </button>
          </form>

          {/* Terms and Conditions (Sign Up Only) */}
          {isSignUp && (
            <p className="text-xs text-gray-600 mt-4">
              By creating an account, you agree to shop.com's{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Notice
              </a>
              .
            </p>
          )}

          {/* Forgot Password (Sign In Only) */}
          {!isSignUp && (
            <div className="mt-4">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
          )}
        </div>

        {/* Toggle Between Sign In and Sign Up */}
        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#eaeded] text-gray-500">
                {isSignUp ? 'Already have an account?' : 'New to shop.com?'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-4 w-full bg-white hover:bg-gray-50 text-gray-900 py-3 rounded-md font-bold border border-gray-300 transition"
          >
            {isSignUp ? 'Sign in to your account' : 'Create your shop.com account'}
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            ← Back to shop.com
          </Link>
        </div>
      </div>
    </div>
  );
}
