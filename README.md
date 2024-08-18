
# My TTS Library

A Node.js library for text-to-speech (TTS) synthesis using system TTS engines and Google TTS API. This library allows you to synthesize speech from text and save the audio output to a file. It supports macOS, Windows, and Linux platforms.

## Features

- **Speak text**: Use the system's TTS engine to synthesize speech.
- **Get audio URL**: Retrieve a direct audio URL from the Google TTS API.
- **Download audio**: Download and save audio from a URL to a file, ensuring unique filenames to avoid overwriting.

## Installation

To use this library, clone the repository and install the dependencies:

```
git clone https://github.com/anuj0224/my_tts_library.git
cd my-tts-library
npm install
```

## Usage

Create a `test.js` file to test the library:

```
const { speak, getAudioUrl, downloadAudio } = require('./index.js');

const text = 'Hello, world! This is a test of the text-to-speech library.';

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
```

Run the `test.js` file with Node.js:

```
node test.js
```

## API

### `speak(text, options, callback)`

Synthesizes speech using the system's TTS engine.

- **`text`**: The text to synthesize.
- **`options`**: Optional settings:
  - **`voice`**: The voice to use (default: `'default'` for macOS).
  - **`speed`**: The speed of speech (default: `1.0`).
- **`callback`**: A function that receives an error if something goes wrong, or `null` if successful.

### `getAudioUrl(text, options)`

Gets a direct audio URL from the Google TTS API.

- **`text`**: The text to synthesize.
- **`options`**: Optional settings:
  - **`lang`**: The language code (default: `'en'`).
  - **`slow`**: Whether to speak slowly (default: `false`).

Returns a promise that resolves to the audio URL.

### `downloadAudio(url, filePath)`

Downloads and saves audio from a URL to a file.

- **`url`**: The URL of the audio to download.
- **`filePath`**: The path where the file should be saved. A timestamp will be appended to the filename to ensure uniqueness.

Returns a promise that resolves when the file is successfully saved.

## Dependencies

- `axios` - Promise-based HTTP client for the browser and Node.js.
- `fs` - File system module (Node.js core module).
- `path` - Utilities for working with file and directory paths (Node.js core module).
- `util` - Utility functions (Node.js core module).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## Contact

For questions or feedback, you can reach me at [mouryaanuj62@gmail.com](mailto:mouryaanuj62@gmail.com).

