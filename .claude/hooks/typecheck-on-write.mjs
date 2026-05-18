#!/usr/bin/env node
// PostToolUse advisory hook. Surfaces TS errors in the package that owns
// the edited file. Non-blocking — never exits 2. Skips if turbo/pnpm not
// available or the file isn't a TS file.

import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const stdin = readFileSync(0, "utf8");
let payload;
try { payload = JSON.parse(stdin); } catch { process.exit(0); }

const input = payload.tool_input ?? {};
const filePath = (input.file_path ?? "").replaceAll("\\", "/");
if (!/\.(ts|tsx)$/i.test(filePath)) process.exit(0);

// Infer workspace from path: apps/<x>, packages/<x>, services/<x>
const m = filePath.match(/(?:^|\/)(apps|packages|services)\/([^/]+)\//);
if (!m) process.exit(0);
const workspace = m[2];

const result = spawnSync("pnpm", ["--filter", workspace, "typecheck"], {
  encoding: "utf8",
  shell: process.platform === "win32",
  timeout: 60_000,
});

if (result.status !== 0) {
  const out = (result.stdout || "") + (result.stderr || "");
  const tail = out.trim().split("\n").slice(-15).join("\n");
  console.error(`[claude-hook] typecheck failed for workspace "${workspace}" (advisory):\n${tail}`);
}
process.exit(0);
