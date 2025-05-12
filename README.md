# <div align="center">🧠 NeuroScan</div>

<div align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg" />
  <img src="https://img.shields.io/badge/react-18.2.0-61DAFB.svg" />
  <img src="https://img.shields.io/badge/express-4.18.3-000000.svg" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemma%203%2027B-8A2BE2.svg" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" />
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png">
  <br><br>
  <strong>A comprehensive AI-powered vulnerability scanning platform with multiple security tools</strong>
  <br>
  Built with React, Express, Prisma, and Google's Gemma 3 27B AI model
</div>

<br>

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:1400/1*Y1hq9sHXG5TJr8bR7OSysg.gif" alt="Security Scan" width="600">
</p>

## 📋 Table of Contents

- [Features](#-features)
- [System Architecture](#-system-architecture) 
- [Installation Guide](#-installation-guide)
  - [Prerequisites](#prerequisites)
  - [WSL2 & Kali Linux Setup](#wsl2--kali-linux-setup)
  - [Project Setup](#project-setup)
- [Available Security Tools](#-available-security-tools)
- [AI-Powered Analysis](#-ai-powered-analysis)
- [Database Configuration](#-database-configuration)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Features

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/1995/1995807.png">
        <br>Multiple Security Tools
      </td>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png">
        <br>AI-Powered Analysis
      </td>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/2092/2092763.png">
        <br>Real-time Scanning
      </td>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/7564/7564788.png">
        <br>Dashboard Visualizations
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/1791/1791961.png">
        <br>JWT Authentication
      </td>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/2058/2058256.png">
        <br>Chat Assistant
      </td>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/3997/3997872.png">
        <br>PDF Reports
      </td>
      <td align="center">
        <img width="50" src="https://cdn-icons-png.flaticon.com/512/6911/6911466.png">
        <br>Responsive Design
      </td>
    </tr>
  </table>
</div>

- **Unified Security Platform**: Access Nmap, Gobuster, WhatWeb, Nikto, Wapiti, and SSLyze in one interface
- **AI Analysis**: Google's Gemma 3 27B model analyzes scan results and provides insights
- **Interactive Chatbot**: Built-in AI security assistant for answering security questions
- **Secure Authentication**: JWT-based user authentication system
- **Database Integration**: PostgreSQL database with Prisma ORM
- **Professional PDF Reports**: Generate comprehensive vulnerability assessment reports
- **Dark Mode Interface**: Modern, sleek UI design with responsive layout
- **WSL Integration**: Optimized for running on Windows Subsystem for Linux (WSL)

## 🏗 System Architecture

<p align="center">
  <img src="https://mermaid.ink/img/pako:eNplksFugzAMhl_FymnVolVwZ4WuB1anTVM1bdmFAgFaNEIURq-9-9KUTls2X-LP__-2YmNdEpG1sMtZdOolTO67mJM-FaSsq6SU4ubOKJvFFrWxvSRFRdUBnzqJe28aoVn7rCTafXSHe9sYjLJ2QjqLhqJrvgqZNXiItFw505MUZXs9OTyLaEtgHEPGccHz0nrdDFESjP1zZYjTXGxAnMhoxvM4y6LQCeJbPAc6G4KN4AefgZc-yzRSpeowRZCZ-98SFuZLMVrj2TE4PWPYo2oPFKcSla51nYw1bz203jC0zC8BcL9O9KQQUx3MilSF58PiUzVB12rTRrdH1w-9bmSN1LTwUp7wG7fjOSZMl93BBX-jKenJOeUVf8L0W5wfo3gxwZDvSJUsmkemM9XISFIepg_ncsWsMAG3T6lMfFfvs1517wtf7hQ5dqSBNzPP-QOTidzK?type=png" alt="System Architecture" width="700">
</p>

## 📥 Installation Guide

### Prerequisites

- Node.js v14.0.0 or higher
- npm or yarn
- PostgreSQL database
- WSL2 with Kali Linux (recommended for best experience)
- Security tools: nmap, gobuster, whatweb, nikto, wapiti, sslyze

### WSL2 & Kali Linux Setup

<details>
<summary>Click to expand WSL2 and Kali Linux installation steps</summary>

#### 1. Enable WSL2 on Windows 10/11

```powershell
# Open PowerShell as Administrator and run:
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# Restart your computer
```

#### 2. Set WSL2 as default version

```powershell
wsl --set-default-version 2
```

#### 3. Install Kali Linux from Microsoft Store

- Search for "Kali Linux" in the Microsoft Store
- Click "Get" or "Install"
- Launch Kali Linux after installation
- Create a username and password when prompted

#### 4. Update and upgrade Kali Linux

```bash
sudo apt update && sudo apt upgrade -y
```

#### 5. Install required security tools

```bash
sudo apt install -y nmap gobuster whatweb nikto wapiti sslyze
```

#### 6. Install Node.js and npm in Kali Linux

```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

#### 7. Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo service postgresql start

# Enable PostgreSQL to start on boot
sudo update-rc.d postgresql enable

# Create a database user (replace 'postgres' with your desired username)
sudo -u postgres createuser --interactive --pwprompt
# Enter name of role to add: postgres
# Enter password for new role: 1234
# Enter it again: 1234
# Shall the new role be a superuser? (y/n) y

# Create a database
sudo -u postgres createdb ai_vuln_db
```
</details>

### Project Setup

<details>
<summary>Click to expand project setup steps</summary>

#### 1. Clone the repository

```bash
git clone https://github.com/anskp/NeuroScan.git
cd NeuroScan
```

#### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

#### 3. Configure database

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/ai_vuln_db?schema=ai_vuln"
JWT_SECRET="your_secure_jwt_secret"
OPENROUTER_API_KEY="your_openrouter_api_key"
```

#### 4. Set up the database schema

```bash
cd backend
npx prisma migrate dev --name init
```

#### 5. Start the application

```bash
# Method 1: Using the start script
bash start-servers.sh

# Method 2: Start servers separately
# Terminal 1
cd backend
PORT=5000 node server.js

# Terminal 2
cd frontend
npm start
```

#### 6. Access the application

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
</details>

## 🔧 Available Security Tools

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*KMnRJ5t6VbSbSN1xHJ1CQg.gif" alt="Security tools animation" width="650">
</p>

### Nmap
Network mapping and port scanning tool that discovers hosts and services on a network.

```bash
# Example usage in NeuroScan
Target: example.com
Options: -sV -p 1-1000
```

### Gobuster
Directory/file enumeration tool for websites.

```bash
# Example usage in NeuroScan
Target: https://example.com
Mode: dir
Wordlist: common.txt
```

### WhatWeb
Web scanner that identifies technologies used on websites.

```bash
# Example usage in NeuroScan
Target: example.com
```

### Nikto
Web server scanner for detecting vulnerabilities.

```bash
# Example usage in NeuroScan
Target: example.com
Scan Mode: fast
```

### Wapiti
Web application vulnerability scanner.

```bash
# Example usage in NeuroScan
Target: https://example.com
Scope: domain
```

### SSLyze
SSL/TLS configuration analyzer.

```bash
# Example usage in NeuroScan
Target: example.com
Scan Mode: compliance
```

## 🧠 AI-Powered Analysis

<p align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png">
</p>

NeuroScan integrates Google's Gemma 3 27B model via the OpenRouter API for advanced vulnerability analysis:

- **Scan Interpretation**: Translates complex scan results into human-readable explanations
- **Vulnerability Context**: Provides detailed background on identified security issues
- **Risk Assessment**: Evaluates severity and potential impact of vulnerabilities
- **Remediation Steps**: Offers actionable steps to address security concerns
- **Compliance Impact**: Maps findings to relevant security standards and frameworks

The AI chatbot assistant is also available for general security questions and guidance, providing:

- Security best practices
- Vulnerability explanations
- Threat intelligence
- Scan result clarifications

## 💾 Database Configuration

NeuroScan uses PostgreSQL with Prisma ORM. The database schema includes:

- **Users**: Authentication and user management
- **Scans**: Store scan targets, types, and results
- **Vulnerabilities**: Detailed vulnerability information
- **Reports**: Generated security assessment reports

To modify the database schema:

1. Edit `backend/prisma/schema.prisma`
2. Run migrations: `npx prisma migrate dev --name your_change_name`
3. Update your models in the backend code

## 📚 API Documentation

<details>
<summary>Click to view API endpoints</summary>

### Authentication Endpoints
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate user and get JWT token
- `GET /api/auth/me`: Get current user information

### Scan Endpoints
- `POST /api/scan`: Run Nmap scan
- `POST /api/gobuster`: Run Gobuster scan
- `POST /api/whatweb`: Run WhatWeb scan
- `POST /api/nikto`: Run Nikto scan
- `POST /api/wapiti`: Run Wapiti scan
- `POST /api/sslyze`: Run SSLyze scan

### Analysis Endpoints
- `POST /api/analyze-scan`: Analyze scan results with AI
- `POST /api/analyze-vulnerabilities/gemma`: Get AI-enhanced vulnerability analysis

### Chat Endpoints
- `POST /api/chat/message`: Send message to AI chat assistant

### Report Endpoints
- `POST /api/reports/generate-pdf`: Generate PDF vulnerability report
</details>

## 🔍 Troubleshooting

<details>
<summary>Common Issues and Solutions</summary>

### Port 5000 Already in Use

If the backend server fails to start due to port 5000 being in use:

```bash
# Check what's using port 5000
sudo lsof -i :5000

# Kill the process
sudo kill -9 <PID>

# Alternatively, specify a different port
PORT=5001 node backend/server.js
```

### Database Connection Issues

If you see "Can't reach database server at localhost:5432":

```bash
# Check PostgreSQL service status
sudo service postgresql status

# Start PostgreSQL if it's not running
sudo service postgresql start

# Verify credentials and database existence
sudo -u postgres psql -c "SELECT 1 FROM pg_database WHERE datname = 'ai_vuln_db'"
```

### Missing Wordlists

If you see "No wordlists available":

```bash
# Create wordlists directory
mkdir -p backend/wordlists

# Copy system wordlists or create basic ones
cp /usr/share/dirb/wordlists/common.txt backend/wordlists/
```

### AI Analysis Not Working

If the AI analysis fails:

1. Check your OpenRouter API key in `backend/.env`
2. Ensure your internet connection is active
3. Verify that your API credits are not exhausted
</details>

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

<div align="center">
  <br>
  <p>
    <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png">
    <br>
    <i>Built with ❤️ by <a href="https://github.com/anskp">anskp</a></i>
    <br>
    <img src="https://visitor-badge.glitch.me/badge?page_id=anskp.neuroscan" alt="visitors">
  </p>
</div>