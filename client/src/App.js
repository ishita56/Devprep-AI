import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import History from './pages/History';
import Login from './pages/Login';
import Register from './pages/Register';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-400">DevPrep AI</h1>
        <div className="flex gap-6 items-center">
          <a href="/" className="text-gray-300 hover:text-white transition">Analyze</a>
          <a href="/history" className="text-gray-300 hover:text-white transition">History</a>
          <span className="text-gray-400 text-sm">{user?.name}</span>
          <button onClick={logout} className="text-red-400 hover:text-red-300 text-sm transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const AppContent = () => {
  const { token } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (!token) {
    return showLogin
      ? <Login onSwitch={() => setShowLogin(false)} />
      : <Register onSwitch={() => setShowLogin(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

