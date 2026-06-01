const  authMiddleware = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const axios = require('axios');
const Analysis = require('../models/Analysis');

const getRepoData = async (repoUrl) => {
  const parts = repoUrl.replace('https://github.com/', '').split('/');
  const owner = parts[0];
  const repo = parts[1];

  const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`
  };

  const repoData = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, { headers });
  const languagesData = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`, { headers });
  const readmeData = await axios.get(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers }).catch(() => null);

  let readme = '';
  if (readmeData) {
    readme = Buffer.from(readmeData.data.content, 'base64').toString('utf-8').slice(0, 2000);
  }

  return {
    name: repoData.data.name,
    description: repoData.data.description,
    languages: Object.keys(languagesData.data),
    stars: repoData.data.stargazers_count,
    readme
  };
};

const getAIAnalysis = async (repoData) => {
  const prompt = `
You are a technical interviewer. Analyze this GitHub repository and provide:
1. A concise summary (3-4 lines)
2. 5 interview questions with answers based on the tech stack

Repository Info:
Name: ${repoData.name}
Description: ${repoData.description}
Languages: ${repoData.languages.join(', ')}
README: ${repoData.readme}

Respond in this exact JSON format:
{
  "summary": "your summary here",
  "codeQuality": {
    "score": 7,
    "explanation": "3-4 line explanation here"
  },
  "questions": [
    {"question": "q1", "answer": "a1"},
    {"question": "q2", "answer": "a2"},
    {"question": "q3", "answer": "a3"},
    {"question": "q4", "answer": "a4"},
    {"question": "q5", "answer": "a5"}
  ]
}`;

  const response = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const content = response.data.choices[0].message.content;
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON found in response');
  const parsed = JSON.parse(jsonMatch[0]);
  return parsed;
};

router.post('/',  authMiddleware, async (req, res) => {
  try {
    const { repoUrl } = req.body;

    if (!repoUrl || !repoUrl.includes('github.com')) {
      return res.status(400).json({ error: 'Valid GitHub URL required' });
    }

    const repoData = await getRepoData(repoUrl);
    const aiAnalysis = await getAIAnalysis(repoData);

    const analysis = new Analysis({
      userId: req.userId,
      repoUrl,
      repoName: repoData.name,
      summary: aiAnalysis.summary,
      interviewQuestions: aiAnalysis.questions
    });

    await analysis.save();
    console.log('Analysis saved:', analysis._id);

    res.json({
      repoName: repoData.name,
      summary: aiAnalysis.summary,
      codeQuality: aiAnalysis.codeQuality,
      interviewQuestions: aiAnalysis.questions,
      languages: repoData.languages,
      stars: repoData.stars
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;