// src/api.ts
import fetch from "node-fetch";
var UnrealSpeech = class {
  api_key;
  base_url;
  headers;
  constructor(api_key) {
    this.api_key = api_key;
    this.base_url = "https://api.v6.unrealspeech.com";
    this.headers = {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json"
    };
  }
  async stream(text, voiceId = "Scarlett", bitrate = "192k", speed = 0, pitch = 1, codec = "libmp3lame", temperature = 0.25) {
    const url = `${this.base_url}/stream`;
    const payload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      Speed: speed,
      Pitch: pitch,
      Codec: codec,
      Temperature: temperature
    };
    const response = await this._makePostRequest(url, payload);
    return response.buffer();
  }
  async createSynthesisTask(text, voiceId = "Scarlett", bitrate = "192k", timestampType = "word", speed = 0, pitch = 1) {
    const url = `${this.base_url}/synthesisTasks`;
    const payload = {
      Text: [text],
      VoiceId: voiceId,
      Bitrate: bitrate,
      TimestampType: timestampType,
      Speed: speed,
      Pitch: pitch
    };
    const response = await this._makePostRequest(url, payload);
    const data = await response.json();
    return data.SynthesisTask?.TaskId || "";
  }
  async getSynthesisTaskStatus(taskId) {
    const url = `${this.base_url}/synthesisTasks/${taskId}`;
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      const response = await this._makeGetRequest(url);
      const data = await response.json();
      const taskStatus = data.SynthesisTask;
      if (taskStatus?.TaskStatus === "completed") {
        return taskStatus;
      } else {
        console.log("Audiobook generation is in progress.");
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      }
    }
    throw new Error("Task status check exceeded maximum attempts");
  }
  async speech(text, voiceId = "Scarlett", bitrate = "320k", timestampType = "sentence", speed = 0, pitch = 1) {
    const url = `${this.base_url}/speech`;
    const payload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      OutputFormat: "uri",
      TimestampType: timestampType,
      Speed: speed,
      Pitch: pitch
    };
    const response = await this._makePostRequest(url, payload);
    return response.json();
  }
  async _makePostRequest(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data)
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error("Error making POST request:", error);
      throw error;
    }
  }
  async _makeGetRequest(url) {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: this.headers
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  }
  async _handleResponse(response) {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response;
  }
};
var api_default = UnrealSpeech;

// src/utils.ts
import { spawn } from "child_process";
import { promises as fsPromises } from "fs";
async function play(buffer) {
  const ffplay = spawn("ffplay", ["-i", "-"]);
  ffplay.stdin.write(buffer);
}
async function save(buffer, filename) {
  await fsPromises.writeFile(filename, buffer);
}
export {
  api_default as default,
  play,
  save
};
