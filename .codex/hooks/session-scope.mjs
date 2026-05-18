#!/usr/bin/env node
// SessionStart hook. Lists workspaces touched since main so the agent
// knows the working scope. Silent if not a git repo or no diff.

import { spawnSync } from "node:child_process";

const r = spawnSync("git", ["diff", "--name-only", "main...HEAD"], {
  encoding: "utf8",
  shell: process.platform === "win32",
  timeout: 5_000,
});
if (r.status !== 0) process.exit(0);

const files = (r.stdout || "").trim().split("\n").filter(Boolean);
if (files.length === 0) process.exit(0);

const workspaces = new Set();
for (const f of files) {
  const m = f.match(/^(apps|packages|services)\/([^/]+)/);
  if (m) workspaces.add(`${m[1]}/${m[2]}`);
}
if (workspaces.size === 0) process.exit(0);

console.log(`Branch touches: ${[...workspaces].sort().join(", ")} (vs main, ${files.length} files).`);
process.exit(0);
