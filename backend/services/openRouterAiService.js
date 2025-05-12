const axios = require('axios');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function getChatCompletion(prompt) {
  try {
    console.log('Processing chat about vulnerabilities');
    
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'google/gemma-3-27b-latest',
        messages: [
          { role: 'system', content: 'You are an expert cybersecurity analyst providing detailed vulnerability assessments.' },
          { role: 'user', content: prompt }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://neuroscan-vuln.com',
          'X-Title': 'NeuroScan Vulnerability Scanner',
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Extract and return the AI response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API error:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get AI analysis: ' + (error.response ? error.response.data.error : error.message));
  }
}

module.exports = {
  getChatCompletion
};