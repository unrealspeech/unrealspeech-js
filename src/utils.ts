// audioUtils.ts
import { spawn } from "child_process";
import fs from "fs";

export function play(buffer: Buffer): void {
  // Spawn an ffplay process
  const ffplay = spawn("ffplay", ["-i", "-"]);

  // Write the buffer to ffplay's stdin
  ffplay.stdin.write(buffer);
}

export function save(buffer: Buffer, filename: string): void {
  // Write the buffer to a file
  fs.writeFileSync(filename, buffer);
}
