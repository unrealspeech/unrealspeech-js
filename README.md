# Unreal Speech JavaScript SDK

Unreal Speech JavaScript SDK allows you to easily integrate the Unreal Speech API into your JavaScript applications for text-to-speech (TTS) synthesis. This package provides convenient methods for working with the Unreal Speech API, including generating speech, managing synthesis tasks, and streaming audio.

To use the `play` utility, you should have FFmpeg installed on your system

## FFmpeg Installation

### Windows

**Download FFmpeg**: Go to the FFmpeg official website (https://ffmpeg.org/download.html) and download the latest build for Windows.

### Mac

**Install Homebrew**: If not already installed, open Terminal and run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`.

## You can install the Unreal Speech JavaScript SDK via npm:

```bash
npm i unrealspeech
```

## Available endpoints

| Endpoint                 | Description                                  |
| ------------------------ | -------------------------------------------- |
| `/stream`                | Stream audio for short, time-sensitive cases |
| `/speech`                | Generate speech with options (MP3 format)    |
| `/synthesisTasks`        | Manage synthesis tasks for longer text       |
| `/synthesisTasks/TaskId` | Check the status of a synthesis task         |

## Common Request Body Schema

| Property | Type   | Required? | Default Value | Allowed Values                             |
| -------- | ------ | --------- | ------------- | ------------------------------------------ |
| VoiceId  | string | Required  | N/A           | Scarlett, Liv, Dan, Will, Amy              |
| Bitrate  | string | Optional  | 192k          | 16k, 32k, 48k, 64k, 128k, 192k, 256k, 320k |
| Speed    | float  | Optional  | 0             | -1.0 to 1.0                                |
| Pitch    | float  | Optional  | 1.0           | 0.5 to 1.5                                 |

## Parameter Details

- **VoiceId:**

  - Dan: Young Male
  - Will: Mature Male
  - Scarlett: Young Female
  - Liv: Young Female
  - Amy: Mature Female

- **Bitrate:** Defaults to 192k. Use lower values for low bandwidth or to reduce the transferred file size. Use higher values for higher fidelity.

- **Speed:** Defaults to 0. Examples:

  - 0.5: makes the audio 50% faster. (i.e., 60-second audio becomes 42 seconds)
  - -0.5: makes the audio 50% slower. (i.e., 60-second audio becomes 90 seconds.)

- **Pitch:** Defaults to 1. However, on the landing page, we default male voices to 0.92 as people tend to prefer lower/deeper male voices.

## Rate Limit

| Plan  | Requests per second |
| ----- | ------------------- |
| Free  | 1                   |
| Basic | 2                   |
| Pro   | 8                   |

## Obtaining an API Key

[Get your API Key](https://unrealspeech.com)
To use the Unreal Speech API, you'll need to obtain an API key by signing up for an account on the Unreal Speech website. Once you have an API key, you can use it to initialize the UnrealSpeechAPI class.

## Usage

To use the SDK, you need to initialize it with your API key and other required configurations.
Initialization

```javascript
import { UnrealSpeechAPI, play, save } from "unrealspeech";
const unrealSpeech = new UnrealSpeechAPI("your_api_key");
```

### Methods

#### `stream(text, voiceId, bitrate, speed, pitch, codec, temperature)`

This method streams the synthesized speech based on the provided parameters.

- `text`: The text to be synthesized.
- `voiceId`: The ID of the voice to be used.
- `bitrate`: The bitrate of the audio.
- `speed`: The speed of speech.
- `pitch`: The pitch of speech.
- `codec`: The audio codec to be used.
- `temperature`: The temperature of speech.

Returns: A promise that resolves to the synthesized speech buffer.

#### `createSynthesisTask(text, voiceId, bitrate, timestampType)`

This method creates a synthesis task for the provided text and voice.

- `text`: The text to be synthesized.
- `voiceId`: The ID of the voice to be used.
- `bitrate`: The bitrate of the audio.
- `timestampType`: The type of timestamp to be used.

Returns: A promise that resolves to the ID of the created synthesis task.

#### `getSynthesisTaskStatus(taskId)`

This method retrieves the status of a synthesis task based on the provided task ID.

- `taskId`: The ID of the synthesis task.

Returns: A promise that resolves to the status of the synthesis task.

#### `speech(text, voiceId, bitrate, timestampType)`

This method synthesizes speech based on the provided text and voice.

- `text`: The text to be synthesized.
- `voiceId`: The ID of the voice to be used.
- `bitrate`: The bitrate of the audio.
- `timestampType`: The type of timestamp to be used.

Returns: A promise that resolves to the synthesized speech data.

### Configuration Options

- `apiKey`: Your API key for authentication.
- Other configuration options and their descriptions.

## Examples

#### stream

This method streams the synthesized speech based on the provided parameters.

```javascript
const speechBuffer = await unrealSpeech.stream(
  "Hello, world!",
  "Scarlett",
  "192k",
  1.5,
  1.0,
  "libmp3lame",
  0.25
);
// Use the synthesized speech buffer as needed

// play audio
play(speechBuffer);
// save audio
save(speechBuffer, "filename.mp3");
```

#### createSynthesisTask

```javascript
const taskId = await unrealSpeech.createSynthesisTask(
  "Hello, world!",
  "Scarlett",
  "192k",
  "word"
);
console.log(taskId); // Use the ID of the created synthesis task as needed
```

#### getSynthesisTaskStatus

```javascript
const taskId = "task123"; // Replace with the actual task ID
const status = await unrealSpeech.getSynthesisTaskStatus(taskId);
console.log(status); // Use the status of the synthesis task as needed
```

#### speech

```javascript
const speechData = await unrealSpeech.speech(
  "Hello, world!",
  "Scarlett",
  "192k",
  "word"
);
console.log(speechData); // Use the synthesized speech data as needed
```

## Code sample

You can find a code example here: [code](https://github.com/unrealspeech/examples/tree/rn-node-backend)

## Troubleshooting

Include common issues and their solutions.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
