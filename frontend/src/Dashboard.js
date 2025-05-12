import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000';

function Dashboard() {
  const [target, setTarget] = useState('');
  const [scanType, setScanType] = useState('nmap');
  const [scanOptions, setScanOptions] = useState('');
  const [scanResults, setScanResults] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [wordlists, setWordlists] = useState([]);
  const [selectedWordlist, setSelectedWordlist] = useState('');
  const [gobusterMode, setGobusterMode] = useState('dir');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatting, setIsChatting] = useState(false);

  useEffect(() => {
    // Load wordlists for directory scanning
    const fetchWordlists = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const response = await axios.get(`${API_URL}/api/wordlists`, {
          headers: { 'x-auth-token': token }
        });
        
        if (response.data.success && response.data.wordlists) {
          setWordlists(response.data.wordlists);
          if (response.data.wordlists.length > 0) {
            setSelectedWordlist(response.data.wordlists[0].path);
          }
        }
      } catch (error) {
        console.error('Error fetching wordlists:', error);
      }
    };
    
    fetchWordlists();
  }, []);

  const handleScan = async (e) => {
    e.preventDefault();
    
    if (!target) {
      setError('Please enter a target');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setScanResults('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        return;
      }
      
      let response;
      
      switch (scanType) {
        case 'nmap':
          response = await axios.post(`${API_URL}/api/scan`, 
            { target, scanOptions }, 
            { headers: { 'x-auth-token': token } }
          );
          break;
          
        case 'gobuster':
          response = await axios.post(`${API_URL}/api/gobuster`, 
            { target, wordlist: selectedWordlist, mode: gobusterMode, options: scanOptions }, 
            { headers: { 'x-auth-token': token } }
          );
          break;
          
        case 'whatweb':
          response = await axios.post(`${API_URL}/api/whatweb`, 
            { target, options: scanOptions }, 
            { headers: { 'x-auth-token': token } }
          );
          break;
          
        default:
          setError('Invalid scan type');
          setIsLoading(false);
          return;
      }
      
      if (response.data.success) {
        setScanResults(response.data.results);
      } else {
        setError(response.data.message || 'Scan failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred');
      console.error('Scan error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeWithAI = async () => {
    if (!scanResults) {
      setError('No scan results to analyze');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsLoading(false);
        return;
      }
      
      const response = await axios.post(`${API_URL}/api/analyze-scan`, 
        { scanResults }, 
        { headers: { 'x-auth-token': token } }
      );
      
      if (response.data.success) {
        // Append AI analysis to scan results
        setScanResults(prevResults => `${prevResults}\n\n--- AI ANALYSIS ---\n\n${response.data.analysis}`);
      } else {
        setError(response.data.message || 'Analysis failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred during analysis');
      console.error('AI analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async (e) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    setIsChatting(true);
    
    // Add user message to chat history
    const userMessage = { role: 'user', content: chatMessage };
    setChatHistory(prev => [...prev, userMessage]);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required. Please log in.');
        setIsChatting(false);
        return;
      }
      
      const response = await axios.post(`${API_URL}/api/chat/message`, 
        { message: chatMessage }, 
        { headers: { 'x-auth-token': token } }
      );
      
      if (response.data.success) {
        // Add AI response to chat history
        const aiMessage = { role: 'assistant', content: response.data.response };
        setChatHistory(prev => [...prev, aiMessage]);
      } else {
        setError(response.data.message || 'Chat failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'An error occurred during chat');
      console.error('Chat error:', error);
    } finally {
      setIsChatting(false);
      setChatMessage('');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>NeuroScan</h1>
        <p>AI-Powered Vulnerability Scanner</p>
      </header>
      
      <div className="dashboard-content">
        <div className="scan-container">
          <h2>Scan Configuration</h2>
          <form onSubmit={handleScan}>
            <div className="form-group">
              <label>Target:</label>
              <input 
                type="text" 
                value={target} 
                onChange={(e) => setTarget(e.target.value)} 
                placeholder="e.g., example.com or 192.168.1.1"
              />
            </div>
            
            <div className="form-group">
              <label>Scan Type:</label>
              <select value={scanType} onChange={(e) => setScanType(e.target.value)}>
                <option value="nmap">Nmap (Port Scanner)</option>
                <option value="gobuster">Gobuster (Directory Scanner)</option>
                <option value="whatweb">WhatWeb (Web Technology Scanner)</option>
              </select>
            </div>
            
            {scanType === 'gobuster' && (
              <>
                <div className="form-group">
                  <label>Mode:</label>
                  <select value={gobusterMode} onChange={(e) => setGobusterMode(e.target.value)}>
                    <option value="dir">Directory/File (dir)</option>
                    <option value="dns">DNS Subdomain (dns)</option>
                    <option value="vhost">Virtual Host (vhost)</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Wordlist:</label>
                  <select value={selectedWordlist} onChange={(e) => setSelectedWordlist(e.target.value)}>
                    {wordlists.map((wordlist, index) => (
                      <option key={index} value={wordlist.path}>
                        {wordlist.name} - {wordlist.description}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            <div className="form-group">
              <label>Additional Options:</label>
              <input 
                type="text" 
                value={scanOptions} 
                onChange={(e) => setScanOptions(e.target.value)} 
                placeholder={scanType === 'nmap' ? "e.g., -sV -p 1-1000" : "Additional options"}
              />
            </div>
            
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Scanning...' : 'Start Scan'}
            </button>
          </form>
          
          {error && <div className="error-message">{error}</div>}
          
          {scanResults && (
            <div className="results-container">
              <h2>Scan Results</h2>
              <div className="actions">
                <button onClick={analyzeWithAI} disabled={isLoading}>
                  {isLoading ? 'Analyzing...' : 'Analyze with Gemma 3 27B'}
                </button>
              </div>
              <pre className="scan-results">{scanResults}</pre>
            </div>
          )}
        </div>
        
        <div className="chat-container">
          <h2>AI Security Assistant</h2>
          <div className="chat-messages">
            {chatHistory.length === 0 ? (
              <div className="empty-chat">
                <p>Ask the AI assistant about security topics, vulnerabilities, or for help interpreting scan results.</p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  <div className="message-content">{msg.content}</div>
                </div>
              ))
            )}
          </div>
          
          <form onSubmit={sendChatMessage} className="chat-input-form">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask a security question..."
              disabled={isChatting}
            />
            <button type="submit" disabled={isChatting || !chatMessage.trim()}>
              {isChatting ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;