# Unreal Speech JavaScript SDK

Unreal Speech JavaScript SDK allows you to easily integrate the Unreal Speech API into your JavaScript applications for text-to-speech (TTS) synthesis. This package provides convenient methods for working with the Unreal Speech API, including generating speech, managing synthesis tasks, and streaming audio.

## You can install the Unreal Speech JavaScript SDK via npm:

```bash
npm i unrealspeech
```

## Usage

To use the SDK, you need to initialize it with your API key and other required configurations.
Initialization

```javascript
import { UnrealSpeech, play, save } from "unrealspeech";
const unrealSpeech = new UnrealSpeech("your_api_key");
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
  "voice123",
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
  "voice123",
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
  "voice123",
  "192k",
  "word"
);
console.log(speechData); // Use the synthesized speech data as needed
```

## Troubleshooting

Include common issues and their solutions.

## Contributing

Information on how to contribute to the SDK, guidelines, and code of conduct.

## License

Information about the license under which the SDK is distributed.

## Support

Contact information for support and assistance.

## Version History

Details of version updates and changes.
