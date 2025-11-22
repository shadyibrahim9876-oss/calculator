
Glassmorphism Calculator — Electron package
------------------------------------------
What I created for you: an Electron project that contains your HTML/CSS/JS and a default icon.
The project is located in the ZIP you can download from this session.

How to build the Windows x64 .exe on your machine:

1. Install Node.js (v16+ recommended): https://nodejs.org/
2. Unzip the project folder and open a terminal in the project folder.
3. Run:
   npm install
   npm run package

   This will create a packaged app in the 'dist' folder (e.g. dist/GlassCalculator-win32-x64).

Notes:
- If 'electron-packager' prompts for missing dependencies, run:
    npm install --save-dev electron-packager
- The packaging script uses the included icon (icon.ico).
- If you prefer a single installer (.msi/.exe installer), use tools like Inno Setup or electron-builder; I can add config for electron-builder if you want.

If you'd like, I can:
- produce an electron-builder config to create a single installer (.exe),
- or adjust window size, menu visibility, or other settings.
