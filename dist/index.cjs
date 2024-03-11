"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => api_default,
  play: () => play,
  save: () => save
});
module.exports = __toCommonJS(src_exports);

// src/api.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
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
      const response = await (0, import_node_fetch.default)(url, {
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
      const response = await (0, import_node_fetch.default)(url, {
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
var import_child_process = require("child_process");
var import_fs = require("fs");
async function play(buffer) {
  const ffplay = (0, import_child_process.spawn)("ffplay", ["-i", "-"]);
  ffplay.stdin.write(buffer);
}
async function save(buffer, filename) {
  await import_fs.promises.writeFile(filename, buffer);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  play,
  save
});
