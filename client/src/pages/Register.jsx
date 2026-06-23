import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = ({ onSwitch }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 important
    setLoading(true);
    setError('');

    try {
      console.log("Submitting:", { name, email, password });

      const response = await axios.post(
        'https://devprep-ai-kc7r.onrender.com/api/auth/register',
        {
          name,
          email,
          password
        }
      );

      console.log("Response:", response.data);

      login(response.data.user, response.data.token);

    } catch (err) {
      console.log("ERROR:", err);

      const errorMsg =
        err.response?.data?.error ||
        err.message ||
        "Something went wrong";

      alert(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-white">Create Account</h2>
        <p className="text-gray-400 mb-6">Join DevPrep AI</p>

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-red-300 text-sm mb-4">
            {error}
          </div>
        )}

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="name" className="text-gray-400 text-sm mb-1 block">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-400 text-sm mb-1 block">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-400 text-sm mb-1 block">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-3 rounded-lg font-semibold transition text-white"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>

        </form>
        {/* ✅ FORM END */}

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already have an account?{' '}
          <button onClick={onSwitch} className="text-blue-400 hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;