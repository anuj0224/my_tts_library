const { speak, getAudioUrl, downloadAudio } = require('./index.js');

const text = 'Hello, Anuj! This is a test of the text-to-speech library.';

// Test the speak function
speak(text, { voice: 'Alex', speed: 1.0 }, (err) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Speech synthesis complete.');
  }
});

// Test Google TTS audio URL and download
(async () => {
  try {
    const url = await getAudioUrl(text, { lang: 'en', slow: false });
    await downloadAudio(url, 'output.mp3');
  } catch (err) {
    console.error('Error:', err);
  }
})();
