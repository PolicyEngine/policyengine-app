#!/bin/bash
# Record the screen showing the Halloween HTML page
# This uses actual screen recording to capture real-time animation

# Open the HTML in browser (Chrome for consistent rendering)
open -a "Google Chrome" "file://$PWD/halloween-graphic.html" &
BROWSER_PID=$!

echo "Waiting for browser to open and render..."
sleep 5

echo "Starting screen recording for 12 seconds..."
echo "Make sure the Chrome window is visible and in focus!"
sleep 2

# Record the screen for exactly 12 seconds
# You'll need to position the Chrome window first
ffmpeg -f avfoundation -capture_cursor 0 -r 30 -i "1:none" -t 12 \
    -c:v libx264 -crf 10 -preset slow -pix_fmt yuv420p \
    -movflags +faststart \
    halloween-screen-record.mp4

echo "Recording complete!"
kill $BROWSER_PID 2>/dev/null

echo "Video saved as: halloween-screen-record.mp4"
