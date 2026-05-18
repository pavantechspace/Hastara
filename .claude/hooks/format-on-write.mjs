#!/usr/bin/env node
// PostToolUse hook. Auto-formats the edited file with Prettier after every
// Edit/Write/MultiEdit. Non-blocking — never exits 2.

import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const stdin = readFileSync(0, 'utf8');
let payload;
try { payload = JSON.parse(stdin); } catch { process.exit(0); }

const filePath = (payload.tool_input?.file_path ?? '').replaceAll('\\', '/');
if (!/\.(ts|tsx|js|jsx|json|md|yaml)$/i.test(filePath)) process.exit(0);

// Skip generated files
if (/\/(\.next|\.expo|node_modules|dist|build)\//.test(filePath)) process.exit(0);

const result = spawnSync('pnpm', ['format', filePath], {
  encoding: 'utf8',
  shell: process.platform === 'win32',
  timeout: 15_000,
});

if (result.status !== 0) {
  const err = (result.stderr || result.stdout || '').trim();
  if (err) console.error(`[claude-hook] format-on-write warning: ${err.split('\n')[0]}`);
}

process.exit(0);
