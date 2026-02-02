# Will You Be My Valentine? App

## Overview
A charming Valentine's Day application that playfully asks the user to be their Valentine with an interactive "Yes/No" choice mechanism.

## Pages

### Home Page
- Display "Anushka will you be my Valentine 👉👈?" text centered on the screen
- Add a hint text below the main question: "(psst... the No button is a little shy)"
- Include smooth background animation with floating hearts or pulsing gradient effects
- Present two buttons: "Yes" and "No 💔" - both buttons should be the same size, matching the current size of the "Yes" button
- The "No" button should use a distinct, non-pink color (purple or light blue for contrast) and include the 💔 heartbreak emoji in the text
- The "No" button should dynamically move away when the user's mouse approaches it or when touched/tapped on mobile devices, using smooth and playful movement within viewport bounds
- The "Yes" button remains clickable and navigates to the success page when clicked
- Ensure responsive layout for both desktop and mobile devices with proper button sizing and spacing
- Include footer text: "Made with ❤️ by Dipesh"

### Success Page
- Display the uploaded image `STK-20260131-WA0002.webp` (showing a person with hand on face)
- Show a sweet message: "Yay! I knew you'd say yes 💖"
- Include subtle fade-in or bounce animations for page transition
- Automatically play the YouTube song "Those Eyes" by New West (`https://www.youtube.com/watch?v=b_CpWmkhwq0`) starting at the 00:45 timestamp when the page loads, using YouTube's embed API or fallback player for reliable playback
- The song should start unmuted by default
- Include a persistent mute/unmute toggle button positioned at the top right corner of the page to control audio playback
- Ensure audio playback begins reliably across desktop and mobile browsers, respecting autoplay restrictions and user gesture requirements
- Audio should stop if the user navigates away from the page
- Maintain responsive design
- Include footer text: "Made with ❤️ by Dipesh"

## Technical Requirements
- Smooth animations and transitions between pages
- Mouse proximity detection and touch input support for the "No" button movement on both desktop and mobile
- Robust YouTube audio playback functionality with proper loading, cleanup, and autoplay restriction handling, starting at specific timestamp (00:45) and unmuted by default
- Persistent mute/unmute toggle control for audio playback
- Responsive design that works properly on desktop and mobile browsers with correct button sizing and layout
- English language content throughout
- No backend data storage required - all interactions are frontend-only
- Remove any watermarks present in the application
