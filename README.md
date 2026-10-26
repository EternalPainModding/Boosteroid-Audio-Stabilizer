# Boosteroid Audio Stabilizer (Anti-Crackling)

A Tampermonkey userscript that tries to reduce **audio crackling / popping** on Boosteroid by routing the game audio through the Web Audio API with a more stable buffer.

> **Made with AI**  
> This project was created with the help of AI (Grok by xAI).  
> Feel free to use, modify, copy, sell, or do **whatever you want** with the code. No restrictions.

## Features

- Routes Boosteroid stream audio through Web Audio API
- Uses a more stable `latencyHint: 'playback'`
- Forces 48 kHz sample rate (common for streaming)
- Gain control (volume boost if needed)
- Automatic reconnection when the stream starts
- Works alongside other Boosteroid userscripts

## Installation

1. Install **[Tampermonkey](https://www.tampermonkey.net/)**
2. Click the raw script link (after uploading to GitHub) or install manually:

### Manual installation

1. Open Tampermonkey → Dashboard → `+` (Create a new script)
2. Delete the default template
3. Paste the contents of `boosteroid-audio-stabilizer.user.js`
4. Save (`Ctrl + S` / `Cmd + S`)

## Usage

1. Start a game on Boosteroid web
2. The script automatically detects the video element and reroutes the audio
3. Open the browser console (F12) to see confirmation messages
4. Optional: Hold **Alt** + **Arrow Up / Arrow Down** to raise or lower the gain

## Notes

- This does **not** guarantee zero crackling (network/jitter issues can still cause it)
- It often helps on devices where the browser’s default audio path is unstable
- Best results are usually seen on Chromium-based browsers (Kiwi, Edge, Chrome)

## License / Freedom

**Public Domain (Unlicense)**

You can do **whatever you want** with this code:
- Copy it
- Modify it
- Sell it
- Rebrand it
- Use it commercially
- Include it in other projects

No attribution required (but appreciated).

## Disclaimer

This is an unofficial community script.  
It is **not** affiliated with or endorsed by Boosteroid.  
Use at your own risk.

## Credits

Created with the assistance of **Grok (xAI)**.
