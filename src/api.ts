import fetch, { Response } from "node-fetch";

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

class UnrealSpeech {
  private api_key: string;
  private base_url: string;
  private headers: Record<string, string>;

  constructor(api_key: string) {
    this.api_key = api_key;
    this.base_url =
      process.env.UNREAL_SPEECH_BASE_URL || "https://api.v6.unrealspeech.com";
    this.headers = {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    };
  }

  async stream(
    text: string,
    voiceId: string = "Scarlett",
    bitrate: string = "192k",
    speed: number = 0,
    pitch: number = 1.0,
    codec: string = "libmp3lame",
    temperature: number = 0.25
  ): Promise<Buffer> {
    const url = `${this.base_url}/stream`;
    const payload: StreamPayload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      Speed: speed,
      Pitch: pitch,
      Codec: codec,
      Temperature: temperature,
    };
    const response = await this._makePostRequest(url, payload);
    return response.buffer();
  }

  async createSynthesisTask(
    text: string,
    voiceId: string = "Scarlett",
    bitrate: string = "192k",
    timestampType: string = "word",
    speed: number = 0,
    pitch: number = 1.0
  ): Promise<string> {
    const url = `${this.base_url}/synthesisTasks`;
    const payload: SynthesisTaskPayload = {
      Text: [text],
      VoiceId: voiceId,
      Bitrate: bitrate,
      TimestampType: timestampType,
      Speed: speed,
      Pitch: pitch,
    };
    const response = await this._makePostRequest(url, payload);
    const data = (await response.json()) as ISynthesisTaskResponse;
    return data.SynthesisTask?.TaskId || "";
  }

  async getSynthesisTaskStatus(
    taskId: string
  ): Promise<ISynthesisTaskResponse["SynthesisTask"]> {
    const url = `${this.base_url}/synthesisTasks/${taskId}`;
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      const response = await this._makeGetRequest(url);
      const data = (await response.json()) as ISynthesisTaskResponse;
      const taskStatus = data.SynthesisTask;
      if (taskStatus?.TaskStatus === "completed") {
        return taskStatus;
      } else {
        console.log("Audiobook generation is in progress.");
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
    throw new Error("Task status check exceeded maximum attempts");
  }

  async speech(
    text: string,
    voiceId: string = "Scarlett",
    bitrate: string = "320k",
    timestampType: string = "sentence",
    speed: number = 0,
    pitch: number = 1.0
  ): Promise<any> {
    const url = `${this.base_url}/speech`;
    const payload: SpeechPayload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      OutputFormat: "uri",
      TimestampType: timestampType,
      Speed: speed,
      Pitch: pitch,
    };
    const response = await this._makePostRequest(url, payload);
    return response.json();
  }

  private async _makePostRequest(url: string, data: any): Promise<Response> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error("Error making POST request:", error);
      throw error;
    }
  }

  private async _makeGetRequest(url: string): Promise<Response> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers,
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  }

  private async _handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      const errorData = await response.json();
      if (errorData && typeof errorData === "object" && "error" in errorData) {
        throw new Error(`HTTP error: ${response.status} - ${errorData.error}`);
      } else {
        throw new Error(`HTTP error: ${response.status}`);
      }
    }
    return response;
  }
}

export default UnrealSpeech;
