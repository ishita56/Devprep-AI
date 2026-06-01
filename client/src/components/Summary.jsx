import React from 'react';

const getScoreColor = (score) => {
  if (score >= 8) return { bg: 'bg-green-900/50', border: 'border-green-700', text: 'text-green-300', ring: '#22c55e' };
  if (score >= 5) return { bg: 'bg-yellow-900/50', border: 'border-yellow-700', text: 'text-yellow-300', ring: '#eab308' };
  return { bg: 'bg-red-900/50', border: 'border-red-700', text: 'text-red-300', ring: '#ef4444' };
};

const Summary = ({ repoName, summary, languages, stars, codeQuality }) => {
  const colors = codeQuality ? getScoreColor(codeQuality.score) : null;

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">{repoName}</h3>
        </div>

        {codeQuality && (
          <div className={`${colors.bg} ${colors.border} border rounded-xl px-4 py-3 text-center min-w-[80px]`}>
            <div className={`text-3xl font-bold ${colors.text}`}>{codeQuality.score}<span className="text-sm">/10</span></div>
            <div className="text-gray-400 text-xs mt-1">Code Quality</div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {languages && languages.map((lang, i) => (
          <span key={i} className="bg-blue-900/50 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-700">
            {lang}
          </span>
        ))}
        {stars !== undefined && (
          <span className="bg-yellow-900/50 text-yellow-300 text-xs px-3 py-1 rounded-full border border-yellow-700">
            ⭐ {stars} stars
          </span>
        )}
      </div>

      <h4 className="text-gray-400 text-sm uppercase tracking-wide mb-3">AI Summary</h4>
      <p className="text-gray-200 leading-relaxed mb-4">{summary}</p>

      {codeQuality && (
        <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
          <h4 className={`text-sm font-semibold ${colors.text} mb-2`}>Code Quality Analysis</h4>
          <p className="text-gray-300 text-sm leading-relaxed">{codeQuality.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Summary;