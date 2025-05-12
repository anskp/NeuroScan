#!/bin/bash
# Script to start both the frontend and backend servers

echo "===== AI Vulnerability Scanner Startup ====="
echo "Starting backend and frontend servers..."

# Make script executable 
chmod +x ./start-servers.sh

# Ensure backend directory exists
if [ ! -d "./backend" ]; then
  echo "Error: backend directory not found. Please run this script from the project root directory."
  exit 1
fi

# Ensure frontend directory exists
if [ ! -d "./frontend" ]; then
  echo "Error: frontend directory not found. Please run this script from the project root directory."
  exit 1
fi

# Function to check for required command
check_command() {
  if ! command -v $1 &> /dev/null; then
    echo "Error: $1 is required but not installed. Please install it first."
    exit 1
  fi
}

# Check for required commands
check_command node
check_command npm

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Start the backend server
echo "Starting backend server..."
cd backend
mkdir -p wordlists

# Ensure wordlists are available
echo "Checking for wordlists..."
if [ -d "/usr/share/dirb/wordlists" ]; then
  echo "Found Kali Linux wordlists, copying common ones to project..."
  cp /usr/share/dirb/wordlists/common.txt ./wordlists/ 2>/dev/null || echo "Could not copy dirb common.txt"
  cp /usr/share/dirb/wordlists/small.txt ./wordlists/ 2>/dev/null || echo "Could not copy dirb small.txt"
fi

# Create a basic wordlist if none exists
if [ ! -f "./wordlists/common.txt" ]; then
  echo "Creating a basic wordlist..."
  echo -e "admin\nlogin\nwp-admin\nadministrator\nupload\nuploads\nbackup\nbackups\nconfig\ndb\nsql\ndata\ncontent\nimages\nimg\njs\ncss\napi\nassets" > ./wordlists/common.txt
fi

# Start backend server in background
echo "Starting backend server from $(pwd)"
node server.js &
BACKEND_PID=$!
echo "Backend server started with PID: $BACKEND_PID"

# Start the frontend server
echo "Starting frontend server..."
cd ../frontend
npm start &
FRONTEND_PID=$!
echo "Frontend server started with PID: $FRONTEND_PID"

# Wait for both processes and handle cleanup on exit
cleanup() {
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Register the cleanup function for these signals
trap cleanup SIGINT SIGTERM

# Display server information
echo ""
echo "===== Servers Started ====="
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Keep script running
wait 