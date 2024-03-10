import { Response } from "node-fetch";

export interface ISynthesisTaskResponse {
  SynthesisTask: {
    CreationTime: string;
    OutputUri: string;
    RequestCharacters: string;
    TaskId: string;
    TaskStatus: string;
    VoiceId: string;
  };
}

export interface UnrealSpeechOptions {
  text: string;
  voiceId?: string;
  bitrate?: string;
  speed?: number;
  pitch?: number;
  codec?: string;
  temperature?: number;
  timestampType?: string;
}

interface ISynthesisTaskResponse {
  SynthesisTask: {
    CreationTime: string;
    OutputUri: string;
    RequestCharacters: string;
    TaskId: string;
    TaskStatus: string;
    VoiceId: string;
  };
}

interface StreamPayload {
  Text: string;
  VoiceId: string;
  Bitrate: string;
  Speed: number;
  Pitch: number;
  Codec: string;
  Temperature: number;
}

interface SynthesisTaskPayload {
  Text: string[];
  VoiceId: string;
  Bitrate: string;
  TimestampType: string;
  Speed: number;
  Pitch: number;
}

interface SpeechPayload {
  Text: string;
  VoiceId: string;
  Bitrate: string;
  OutputFormat: string;
  TimestampType: string;
  Speed: number;
  Pitch: number;
}
