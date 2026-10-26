// ==UserScript==
// @name         Boosteroid Audio Stabilizer (Anti-Crackling)
// @namespace    https://github.com/EternalPainModding/Boosteroid-Audio-Stabilizer
// @version      1.1.0
// @description  Reduces audio crackling on Boosteroid by routing the stream through Web Audio API with a more stable buffer and gain control
// @author       Community
// @match        https://cloud.boosteroid.com/*
// @match        https://*.boosteroid.com/*
// @icon         https://www.boosteroid.com/favicon.ico
// @grant        none
// @run-at       document-idle
// @license      Unlicense
// @attribution  Made with AI (Grok by xAI) – free to use, modify, sell, whatever you want
// ==/UserScript==

(function () {
    'use strict';

    let audioContext = null;
    let sourceNode = null;
    let gainNode = null;
    let connected = false;

    function log(...args) {
        console.log('[Boosteroid Audio Stabilizer]', ...args);
    }

    function setupAudio(video) {
        if (connected || !video) return;

        try {
            // Create AudioContext with low latency preference but more stable buffer
            audioContext = new (window.AudioContext || window.webkitAudioContext)({
                latencyHint: 'playback',   // more stable than 'interactive'
                sampleRate: 48000          // common sample rate for streaming
            });

            // Resume if suspended (browsers often suspend AudioContext)
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            sourceNode = audioContext.createMediaElementSource(video);
            gainNode = audioContext.createGain();

            // Start at normal volume (you can raise this carefully, e.g. 1.2–1.5)
            gainNode.gain.value = 1.0;

            sourceNode.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // Keep context alive
            video.addEventListener('play', () => {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            });

            // Prevent the original element volume from being muted by some browsers
            video.volume = 1.0;
            video.muted = false;

            connected = true;
            log('Audio routed through Web Audio API – crackling should improve');
        } catch (err) {
            console.error('[Boosteroid Audio Stabilizer] Failed to set up audio:', err);
        }
    }

    // Wait for the streaming video element
    function findAndSetup() {
        // Common selectors used by Boosteroid
        const video = document.querySelector('video#remotevideo') ||
                      document.querySelector('video[id*="remote"]') ||
                      document.querySelector('video');

        if (video && video.readyState >= 2) {
            setupAudio(video);
        }
    }

    // Poll until the video appears
    const interval = setInterval(() => {
        findAndSetup();
        if (connected) clearInterval(interval);
    }, 1500);

    // Also try on mutations (in case the player loads later)
    const observer = new MutationObserver(() => findAndSetup());
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            observer.observe(document.body, { childList: true, subtree: true });
        });
    }

    // Optional: keyboard shortcut to raise/lower gain (ArrowUp / ArrowDown while holding Alt)
    document.addEventListener('keydown', (e) => {
        if (!gainNode || !e.altKey) return;

        if (e.key === 'ArrowUp') {
            gainNode.gain.value = Math.min(2.0, gainNode.gain.value + 0.1);
            log('Gain:', gainNode.gain.value.toFixed(1));
        }
        if (e.key === 'ArrowDown') {
            gainNode.gain.value = Math.max(0.1, gainNode.gain.value - 0.1);
            log('Gain:', gainNode.gain.value.toFixed(1));
        }
    });

    console.log('[Boosteroid Audio Stabilizer] v1.1.0 loaded');
})();
