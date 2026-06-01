import React, { useState } from 'react';
import axios from 'axios';
import RepoInput from '../components/RepoInput';
import Summary from '../components/Summary';
import Questions from '../components/Questions';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (url) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', {
        repoUrl: url
      },{
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}

      });
      setResult(response.data);
    } catch (err) {
      setError('Something went wrong. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <RepoInput onAnalyze={handleAnalyze} loading={loading} />

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Analyzing repository...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-5 text-red-300">
          {error}
        </div>
      )}

      {result && (
        <>
         <Summary repoName={result.repoName} summary={result.summary} languages={result.languages} stars={result.stars} codeQuality={result.codeQuality} />
          <Questions questions={result.interviewQuestions} />
        </>
      )}
    </div>
  );
};

export default Home;