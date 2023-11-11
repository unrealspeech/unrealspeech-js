import fetch from "node-fetch";

class UnrealSpeechAPI {
  constructor(api_key) {
    this.api_key = api_key;
    this.base_url = "https://api.v6.unrealspeech.com";
    this.headers = {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    };
  }

  async stream(
    text,
    voice_id,
    bitrate = "192k",
    speed = 0,
    pitch = 1.0,
    codec = "libmp3lame",
    temperature = 0.25
  ) {
    const url = `${this.base_url}/stream`;
    const payload = {
      Text: text,
      VoiceId: voice_id,
      Bitrate: bitrate,
      Speed: speed,
      Pitch: pitch,
      Codec: codec,
      Temperature: temperature,
    };

    const response = await this._makePostRequest(url, payload);
    return response.buffer();
  }

  async create_synthesis_task(
    text,
    voice_id,
    bitrate = "192k",
    timestamp_type = "word"
  ) {
    const url = `${this.base_url}/synthesisTasks`;
    const payload = {
      Text: [text],
      VoiceId: voice_id,
      Bitrate: bitrate,
      TimestampType: timestamp_type,
    };

    const response = await this._makePostRequest(url, payload);
    const task_id = response.json().SynthesisTask.TaskId;
    return task_id;
  }

  async get_synthesis_task_status(task_id) {
    const url = `${this.base_url}/synthesisTasks/${task_id}`;
    while (true) {
      const response = await this._makeGetRequest(url);
      const task_status = response.json().SynthesisTask;
      if (task_status.TaskStatus === "completed") {
        return task_status;
      } else {
        console.log("Audiobook generation is in progress.");
      }
    }
  }

  async speech(
    text,
    voiceId = "Scarlett",
    bitrate = "320k",
    timestamp_type = "sentence"
  ) {
    const url = `${this.base_url}/speech`;
    const payload = {
      Text: text,
      VoiceId: voiceId,
      Bitrate: bitrate,
      OutputFormat: "uri",
      TimestampType: timestamp_type,
    };

    const response = await this._makePostRequest(url, payload);
    return response.json();
  }

  async _makePostRequest(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response;
  }

  async _makeGetRequest(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response;
  }
}

export default UnrealSpeechAPI;
