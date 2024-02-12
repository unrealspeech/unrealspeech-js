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

export default class UnrealSpeech {
  private api_key: string;
  private base_url: string;
  private headers: Record<string, string>;

  constructor(api_key: string);

  stream(options: UnrealSpeechOptions): Promise<Buffer>;
  createSynthesisTask(options: UnrealSpeechOptions): Promise<string>;
  getSynthesisTaskStatus(
    taskId: string
  ): Promise<ISynthesisTaskResponse["SynthesisTask"]>;
  speech(options: UnrealSpeechOptions): Promise<any>;
}
