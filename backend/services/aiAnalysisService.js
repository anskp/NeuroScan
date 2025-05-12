const axios = require('axios');
const openRouterAiService = require('./openRouterAiService');

async function analyzeScan(scanResults) {
  try {
    // Build prompt for the OpenRouter AI
    const prompt = `
      You are an expert cybersecurity AI assistant tasked with analyzing the following network scan results.
      Please identify potential vulnerabilities, security issues, and provide recommendations.
      Format your analysis in sections: Summary, Vulnerabilities Detected, Risk Assessment, and Recommendations.
      
      Here are the scan results:
      ${scanResults}
    `;
    
    // Get analysis from OpenRouter AI
    const analysis = await openRouterAiService.getChatCompletion(prompt);
    
    return analysis;
  } catch (error) {
    console.error(`Error analyzing scan results: ${error}`);
    throw error;
  }
}

module.exports = {
  analyzeScan
};