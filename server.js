require('dotenv').config();
const express = require('express');
const multer = require('multer');
// const pdf = require('pdf-parse');
let pdf = require('pdf-parse');

const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow frontend to talk to backend

// Configure Multer to save uploaded files temporarily
const upload = multer({ dest: 'uploads/' });

// Initialize AI (Get your API key from Google AI Studio)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // 1. Read the uploaded PDF file
        const dataBuffer = fs.readFileSync(req.file.path);

        // 2. Parse PDF to Text
        const pdfData = await pdf(dataBuffer);
        const resumeText = pdfData.text;

        // 3. Construct the Prompt for the AI
        const prompt = `
            You are an expert HR Manager. 
            Analyze the following resume text and provide:
            1. A score out of 100.
            2. Three specific bullet points on how to improve it.
            3. Highlight any missing keywords for a Software Engineer role.
            
            Resume Text:
            ${resumeText}
        `;

        // 4. Call the AI Model
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const feedback = response.text();

        // 5. Cleanup (Delete the temp file) & Send Response
        fs.unlinkSync(req.file.path); 
        
        res.json({ 
            success: true, 
            analysis: feedback 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to analyze resume" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));