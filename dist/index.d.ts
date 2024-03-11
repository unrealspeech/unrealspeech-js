type ISynthesisTaskResponse = {
    SynthesisTask: {
        CreationTime: string;
        OutputUri: string;
        RequestCharacters: string;
        TaskId: string;
        TaskStatus: string;
        VoiceId: string;
    };
};
type StreamPayload = {
    Text: string;
    VoiceId: string;
    Bitrate: string;
    Speed: number;
    Pitch: number;
    Codec: string;
    Temperature: number;
};
type SynthesisTaskPayload = {
    Text: string[];
    VoiceId: string;
    Bitrate: string;
    TimestampType: string;
    Speed: number;
    Pitch: number;
};
type SpeechPayload = {
    Text: string;
    VoiceId: string;
    Bitrate: string;
    OutputFormat: string;
    TimestampType: string;
    Speed: number;
    Pitch: number;
};

declare class UnrealSpeech {
    private api_key;
    private base_url;
    private headers;
    constructor(api_key: string);
    stream(text: string, voiceId?: string, bitrate?: string, speed?: number, pitch?: number, codec?: string, temperature?: number): Promise<Buffer>;
    createSynthesisTask(text: string, voiceId?: string, bitrate?: string, timestampType?: string, speed?: number, pitch?: number): Promise<string>;
    getSynthesisTaskStatus(taskId: string): Promise<ISynthesisTaskResponse["SynthesisTask"]>;
    speech(text: string, voiceId?: string, bitrate?: string, timestampType?: string, speed?: number, pitch?: number): Promise<any>;
    private _makePostRequest;
    private _makeGetRequest;
    private _handleResponse;
}

declare function play(buffer: Buffer): Promise<void>;
declare function save(buffer: Buffer, filename: string): Promise<void>;

export { type ISynthesisTaskResponse, type SpeechPayload, type StreamPayload, type SynthesisTaskPayload, UnrealSpeech as default, play, save };
