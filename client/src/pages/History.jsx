import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHistory(response.data);
    } catch (err) {
      console.error('Error fetching history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/history/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setHistory(history.filter(item => item._id !== id));
    } catch (err) {
      console.error('Error deleting');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Analysis History</h2>
      {history.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 text-center text-gray-400">
          No analysis history yet. Analyze a repo first!
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item._id} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg">{item.repoName}</h3>
                  <a href={item.repoUrl} target="_blank" rel="noreferrer" className="text-blue-400 text-sm hover:underline">
                    {item.repoUrl}
                  </a>
                </div>
                <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 text-sm transition">
                  Delete
                </button>
              </div>
              <p className="text-gray-300 text-sm">{item.summary}</p>
              <p className="text-gray-500 text-xs mt-3">{new Date(item.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;