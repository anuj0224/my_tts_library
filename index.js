const { exec } = require('child_process');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

// Function to speak text using the system's TTS engine
function speak(text, options = {}, callback) {
  if (process.platform === 'darwin') { // macOS
    const voice = options.voice || 'default';
    const speed = options.speed || 1.0;
    const command = `say -v ${voice} -r ${speed * 200} "${text}"`;

    exec(command, (error) => {
      if (error) {
        return callback(error);
      }
      callback(null);
    });
  } else if (process.platform === 'win32') { // Windows
    const command = `PowerShell -Command "Add-Type –AssemblyName System.Speech; `
      + `$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer; `
      + `$synth.Speak('${text}')"`;

    exec(command, (error) => {
      if (error) {
        return callback(error);
      }
      callback(null);
    });
  } else if (process.platform === 'linux') { // Linux
    callback(new Error('Linux TTS not yet implemented.'));
  } else {
    callback(new Error('Unsupported platform.'));
  }
}

// Function to get an audio URL from Google TTS API
async function getAudioUrl(text, options = {}) {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${options.lang || 'en'}&client=gtx&slow=${options.slow || false}`;
  return url;
}

// Function to download and save audio from a URL
async function downloadAudio(url, filePath) {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer'
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    const buffer = Buffer.from(response.data);

    // Ensure unique filename by appending timestamp
    const extname = path.extname(filePath);
    const basename = path.basename(filePath, extname);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const newFilePath = `${basename}_${timestamp}${extname}`;

    await writeFile(newFilePath, buffer, 'binary');
    console.log('Audio content written to file:', newFilePath);
  } catch (error) {
    console.error('Error downloading or saving audio:', error.message);
  }
}

module.exports = {
  speak,
  getAudioUrl,
  downloadAudio
};
