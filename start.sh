#!/bin/bash

echo "Starting AI Fitness Application..."
echo ""

echo "Starting Backend Server..."
python server.py &
BACKEND_PID=$!

sleep 3

echo "Starting Frontend..."
npm start &
FRONTEND_PID=$!

echo ""
echo "Application started!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

wait

