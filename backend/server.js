const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const prisma = require('./prisma/db');
const authRoutes = require('./routes/auth');
const { auth } = require('./middleware/auth');
const aiAnalysisService = require('./services/aiAnalysisService');
const openRouterAiService = require('./services/openRouterAiService');
const chatRoutes = require('./routes/chatApi');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Chat routes
app.use('/api/chat', chatRoutes);

// User routes
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // In a real app, hash this password
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Post routes
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } }
      }
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nmap scan endpoint - now protected with auth middleware
app.post('/api/scan', auth, (req, res) => {
  const { target, scanOptions } = req.body;
  
  // Validate input to prevent command injection
  if (!target || !target.match(/^[a-zA-Z0-9\.\-\/:]+$/)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid target. Only alphanumeric characters, dots, hyphens, and forward slashes are allowed.'
    });
  }
  
  // Build the nmap command with safe options
  let command = `nmap ${target}`;
  
  // Add scan options if provided and valid
  if (scanOptions && typeof scanOptions === 'string' && 
      scanOptions.match(/^[a-zA-Z0-9\-\s]+$/)) {
    command = `nmap ${scanOptions} ${target}`;
  }
  
  console.log(`Executing: ${command}`);
  
  // Execute nmap command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      console.error(`Error details: ${JSON.stringify(error)}`);
      console.error(`stderr: ${stderr}`);
      
      return res.status(500).json({ 
        success: false, 
        message: 'Error executing nmap scan', 
        error: stderr || error.message
      });
    }
    
    // Process the scan results with AI for enhanced insights
    console.log('Processing scan results for AI enhancement');
    
    // Store scan results for the target
    const timestamp = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit'
    }).replace(/\//g, '') + '_' + 
    new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    }).replace(/:/g, '').replace(/\s/g, '');
    
    const filename = `${target}_${timestamp}.txt`;
    
    // Write the scan results to a file
    fs.writeFile(filename, stdout, err => {
      if (err) {
        console.error(`Error writing scan results to file: ${err}`);
      } else {
        console.log(`Scan results saved to ${filename}`);
      }
    });
    
    return res.json({ 
      success: true, 
      results: stdout 
    });
  });
});

// AI Analysis of scan results
app.post('/api/analyze-scan', auth, async (req, res) => {
  const { scanResults } = req.body;
  
  if (!scanResults) {
    return res.status(400).json({
      success: false,
      message: 'No scan results provided for analysis'
    });
  }
  
  console.log('Analyzing vulnerabilities with OpenRouter AI');
  
  try {
    // Use AI service to analyze the scan results
    const analysis = await aiAnalysisService.analyzeScan(scanResults);
    
    return res.json({
      success: true,
      analysis
    });
  } catch (error) {
    console.error(`AI analysis error: ${error}`);
    return res.status(500).json({
      success: false,
      message: 'Error during AI analysis',
      error: error.message
    });
  }
});

// Start server
try {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Prisma connected to the database');
  });
} catch (error) {
  console.error(`Server error: ${error}`);
}