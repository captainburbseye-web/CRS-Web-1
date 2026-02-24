#!/bin/bash
# Generate a simple mechanical click sound using sox
# This creates a short, sharp click similar to a Vault-Tec terminal button

if ! command -v sox &> /dev/null; then
    echo "sox not installed, creating placeholder file"
    # Create a tiny silent audio file as placeholder
    echo "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQAAAAA=" | base64 -d > click.mp3
    exit 0
fi

# Generate click sound with sox
sox -n -r 44100 -c 1 click.wav synth 0.05 sine 800 vol 0.3 fade 0 0.05 0.02
# Convert to mp3 (if ffmpeg available)
if command -v ffmpeg &> /dev/null; then
    ffmpeg -i click.wav -codec:a libmp3lame -qscale:a 9 click.mp3 -y 2>/dev/null
    rm click.wav
else
    mv click.wav click.mp3
fi
