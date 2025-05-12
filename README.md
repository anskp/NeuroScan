# AI Vulnerability Scanner

A comprehensive web-based vulnerability scanning platform with multiple scanning tools for security testing and assessment.

## Features

- Multiple security scanning tools in one unified interface
- Supports various scanners including Nmap, Gobuster, WhatWeb, Nikto, Wapiti, and SSLyze
- Authentication system to protect scans
- Responsive dashboard layout
- Result visualization and analysis
- AI-powered vulnerability analysis with Google's Gemma 3 27B model

## Quick Start

The easiest way to run the application is using our setup script:

```bash
# Navigate to the frontend directory
cd frontend

# Run the setup and start script
node setup-and-run.js
```

This script will:
1. Set up required wordlists (copying from Kali Linux if available)
2. Start the backend server
3. Start the frontend development server
4. Open the application in your browser

## Manual Setup

If you prefer to set up manually or encounter issues with the quick start:

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up wordlists
mkdir -p wordlists

# Copy wordlists from Kali Linux (if available)
cp /usr/share/dirb/wordlists/common.txt wordlists/
cp /usr/share/dirb/wordlists/small.txt wordlists/

# Start the backend server
node server.js
```

### Frontend Setup

```bash
# In a new terminal, navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

## Fixing Common Issues

### Wordlist Not Found Error

If you see "Failed to load wordlists" or "No wordlists available":

1. Make sure the backend is running
2. Run the wordlist setup script:
   ```bash
   cd frontend
   node setup-wordlists.js
   ```
3. Restart the application

### Authentication Error (Token is not valid)

If you see authentication errors:

1. Clear browser storage/cookies
2. Restart both frontend and backend servers
3. Log in again with your credentials

### API Request Errors

If API requests are failing:

1. Ensure the backend server is running on port 5000
2. Check that your browser allows cross-origin requests
3. Verify the network connection between frontend and backend

## Available Scanning Tools

### Nmap Scanner
Network mapping and port scanning

### Gobuster
Directory/file enumeration tool

### WhatWeb
Website fingerprinting and technology detection

### Nikto
Web server scanner for detecting vulnerabilities

### Wapiti
Web application vulnerability scanner

### SSLyze
SSL/TLS configuration analyzer

## AI Analysis

The application includes an AI-powered vulnerability analysis feature:

- Uses Google's Gemma 3 27B model via OpenRouter API
- Provides detailed explanations of detected vulnerabilities
- Suggests remediation steps and best practices
- References relevant security standards and CVEs
- Enhances scan results with expert security insights

To use the AI analysis:
1. Run a scan with any of the available tools
2. Click the "Analyze with Gemma 3 27B" button
3. Review the AI-generated analysis of your vulnerabilities

## Requirements

- Node.js (v14+)
- npm
- Kali Linux (recommended for built-in scanning tools)
- Installed security tools: nmap, gobuster, whatweb, nikto, wapiti, sslyze
- Internet connection for AI analysis features

If running on Kali Linux, most tools are pre-installed. On other platforms, you may need to install these tools separately.

## License

This project is licensed under the MIT License - see the LICENSE file for details.