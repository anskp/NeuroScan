const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const openRouterAiService = require('../services/openRouterAiService');

// @route   POST api/chat/message
// @desc    Send a chat message to the AI assistant
// @access  Private (requires auth)
router.post('/message', auth, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'No message provided'
      });
    }
    
    // Get AI response from OpenRouter
    const aiResponse = await openRouterAiService.getChatCompletion(message);
    
    return res.json({
      success: true,
      response: aiResponse
    });
  } catch (error) {
    console.error(`Chat API error: ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Error processing chat message',
      error: error.message
    });
  }
});

module.exports = router;