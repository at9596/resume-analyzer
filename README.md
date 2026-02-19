# 🚀 AI-Powered Resume Analyzer
<img width="1816" height="659" alt="image" src="https://github.com/user-attachments/assets/1c847efa-2450-47e6-9538-2f4665e69131" />

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green) ![Express](https://img.shields.io/badge/Express-v4-blue) ![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

A full-stack web application that uses **Generative AI (Google Gemini)** to audit resumes. Users upload a PDF, and the application parses the text, sends it to the LLM, and returns a structured analysis including an **ATS Score**, **Summary**, **Actionable Improvements**, and **Missing Keywords**.

## ✨ Features

- **📄 PDF Parsing:** Extracts raw text from binary PDF files using `pdf-parse`.
- **🤖 AI Integration:** connects to Google's **Gemini 3 Flash Preview** model for high-speed analysis.
- **⚡ Structured Data:** Forces the AI to return strict JSON (not chat text) for consistent UI rendering.
- **🎨 Modern UI:** Clean, responsive interface with a scoring gauge, checklists, and keyword badges.
- **🔒 Secure File Handling:** Uses `Multer` for temporary file storage and automatic cleanup after processing.

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **AI Model:** Google Gemini API (`@google/generative-ai`)
- **File Handling:** Multer (Uploads), PDF-Parse (Text Extraction)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/at9596/resume-analyzer.git](https://github.com/at9596/resume-analyzer.git)
cd resume-analyzer
2. Install Dependencies
Bash

npm install
3. Configure Environment Variables
Create a .env file in the root directory and add your Google Gemini API Key:

Code snippet

API_KEY=your_actual_google_api_key_here
(You can get a free key from Google AI Studio)

4. Run the Server
Bash

node server.js
5. Use the App
Open your browser and navigate to:
http://localhost:3000

🧠 How It Works (Architecture)
Upload: User selects a PDF on the frontend.

Middleware: Multer saves the file to a temporary uploads/ folder.

Extraction: The server reads the file buffer and uses pdf-parse to convert the binary PDF into a text string.

Prompt Engineering: The server constructs a prompt telling the AI to act as an "Expert HR Manager" and strictly output JSON.

AI Analysis: The text is sent to the Gemini API.

Cleanup: The server parses the JSON response, deletes the uploaded file to save space, and sends the data back to the frontend.

📂 Project Structure
Bash

resume-analyzer/
├── node_modules/       # Dependencies
├── uploads/            # Temp storage for PDFs
├── .env                # API Keys (gitignored)
├── index.html          # Frontend UI
├── package.json        # Project metadata
├── server.js           # Main backend logic
└── README.md           # Documentation
