const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());

// Existing email functionality
app.post('/api/email', (req, res) => {
    // Email functionality code goes here
});

// New Ollama API Integration
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const ollamaResponse = await fetch('http://localhost:11434/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await ollamaResponse.json();
        return res.json({ response: data.reply });
    } catch (error) {
        console.error('Ollama API not available, using predefined responses.');
        const predefinedResponses = {
            'hello': 'Hi there! How can I help you?',
            'how are you?': 'I am just a bot, but thanks for asking!'
        };
        return res.json({ response: predefinedResponses[userMessage.toLowerCase()] || 'I am unable to respond to that right now.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
