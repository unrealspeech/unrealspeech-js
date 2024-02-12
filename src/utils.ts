// audioUtils.ts
import { spawn } from "child_process";
import { promises as fsPromises } from "fs";

export async function play(buffer: Buffer): Promise<void> {
  // Spawn an ffplay process
  const ffplay = spawn("ffplay", ["-i", "-"]);

  // Write the buffer to ffplay's stdin
  ffplay.stdin.write(buffer);
}

export async function save(buffer: Buffer, filename: string): Promise<void> {
  // Write the buffer to a file using promises-based API
  await fsPromises.writeFile(filename, buffer);
}
