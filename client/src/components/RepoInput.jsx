import React, { useState } from 'react';

const RepoInput = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      <h2 className="text-2xl font-bold mb-2">Analyze GitHub Repository</h2>
      <p className="text-gray-400 mb-6">Enter a public GitHub repo URL to get AI summary and interview questions</p>
      
      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/username/repository"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </div>
  );
};

export default RepoInput;