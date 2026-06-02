# DevPrep AI

🔗 **Live Demo:https://devprepai-alpha.vercel.app/

📂 **GitHub Repository:** https://github.com/ishita56/Devprep-AI

---

## Overview

DevPrep AI is an AI-powered GitHub Repository Analyzer that helps developers prepare for technical interviews by analyzing public GitHub repositories and generating AI-driven insights.

The platform evaluates repository information, provides project summaries, assigns a code quality score, and generates repository-specific interview questions to help developers better understand projects and prepare for technical discussions.

---

## Features

* GitHub Repository Analysis
* AI-Generated Project Summary
* Code Quality Score (1–10)
* Repository-Specific Interview Questions
* Programming Languages Detection
* GitHub Stars & Repository Statistics
* Analysis History Tracking
* Secure Authentication (JWT)
* Responsive User Interface

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### AI & APIs

* Groq API (Llama 3.1 8B Instant)
* GitHub REST API

---

## Installation

### Clone Repository

```bash
git clone https://github.com/ishita56/Devprep-AI.git
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key

GITHUB_TOKEN=your_github_token
```

---

## How It Works

1. Enter a public GitHub repository URL.
2. DevPrep AI fetches repository metadata using the GitHub API.
3. AI analyzes the repository information.
4. The system generates:

   * Project Summary
   * Code Quality Score
   * Repository-Specific Interview Questions
   * Improvement Suggestions
5. Results are stored in analysis history for future reference.

---

## Future Improvements

* PDF Report Export
* Repository Comparison
* Personalized Learning Recommendations
* Advanced Repository Metrics
* AI Career Guidance
* Team Collaboration Insights

---

## Author

**Ishita**

Built using React, Node.js, Express.js, MongoDB, GitHub REST API, and Groq AI.
