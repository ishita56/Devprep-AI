import React, { useState } from 'react';

const Questions = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
      <h4 className="text-gray-400 text-sm uppercase tracking-wide mb-6">Interview Questions</h4>
      <div className="space-y-3">
        {questions.map((item, index) => (
          <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-gray-800 transition"
            >
              <span className="font-medium text-white">{index + 1}. {item.question}</span>
              <span className="text-blue-400 ml-4 text-lg">{openIndex === index ? '▲' : '▼'}</span>
            </button>
            {openIndex === index && (
              <div className="px-5 py-4 bg-gray-800/50 border-t border-gray-700">
                <div className="flex gap-3">
                  <div className="w-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;