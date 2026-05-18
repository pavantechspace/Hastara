#!/usr/bin/env node
// PreToolUse hook for Edit/Write/MultiEdit.
// Blocks content that violates CLAUDE.md §1 Critical Rules.
//   - console.log / console.error outside test files (rule 8)
//   - `: any` / `as any` outside .d.ts (rule 1)
//   - hardcoded API keys (rule 5) — sk-ant-, sk-proj-, pk_live_, whsec_, JWT prefixes
//
// Exit 2 + stderr to block. Exit 0 to allow.

import { readFileSync } from "node:fs";

const stdin = readFileSync(0, "utf8");
let payload;
try {
  payload = JSON.parse(stdin);
} catch {
  process.exit(0);
}

const toolName = payload.tool_name ?? "";
const input = payload.tool_input ?? {};
const filePath = (input.file_path ?? "").replaceAll("\\", "/");

const candidates = [];
if (typeof input.content === "string") candidates.push(input.content);
if (typeof input.new_string === "string") candidates.push(input.new_string);
if (Array.isArray(input.edits)) {
  for (const e of input.edits) {
    if (typeof e?.new_string === "string") candidates.push(e.new_string);
  }
}
if (candidates.length === 0) process.exit(0);

const body = candidates.join("\n");

const isTestFile = /\.(test|spec)\.(ts|tsx|js|jsx|mjs)$/i.test(filePath)
  || /[\\/](test-utils|__tests__|__mocks__)[\\/]/i.test(filePath);
const isTypesDecl = /\.d\.ts$/i.test(filePath);
const isEnvExample = /\.env\.example$/i.test(filePath) || /\.env\.sample$/i.test(filePath);
const isMarkdown = /\.(md|mdx)$/i.test(filePath);
const isHookScript = filePath.includes(".claude/hooks/");

const violations = [];

if (!isTestFile && !isMarkdown && !isHookScript && /\bconsole\.(log|error|warn|info|debug)\s*\(/.test(body)) {
  violations.push("console.* call outside test file — use packages/core/logger.ts (CLAUDE.md §1.8).");
}

if (!isTypesDecl && !isMarkdown && /(?::\s*any\b|\bas\s+any\b)/.test(body)) {
  violations.push("`: any` or `as any` detected — use `unknown` + type guards (CLAUDE.md §1.1).");
}

if (!isEnvExample && !isMarkdown) {
  const keyPatterns = [
    { re: /sk-ant-api03-[A-Za-z0-9_-]{10,}/, name: "Anthropic API key" },
    { re: /sk-proj-[A-Za-z0-9_-]{10,}/, name: "OpenAI project key" },
    { re: /\bpk_live_[A-Za-z0-9]{10,}/, name: "Stripe live publishable key" },
    { re: /\bsk_live_[A-Za-z0-9]{10,}/, name: "Stripe live secret key" },
    { re: /\bwhsec_[A-Za-z0-9]{16,}/, name: "Stripe/Clerk webhook secret" },
    { re: /eyJhbGciOi[A-Za-z0-9_=-]{20,}\.[A-Za-z0-9_=-]{20,}\.[A-Za-z0-9_=-]{20,}/, name: "JWT/Supabase key" },
    { re: /\bphc_[A-Za-z0-9]{20,}/, name: "PostHog key" },
  ];
  for (const { re, name } of keyPatterns) {
    if (re.test(body)) {
      violations.push(`Hardcoded ${name} detected — read from process.env instead (CLAUDE.md §1.3, §7).`);
    }
  }
}

if (violations.length > 0) {
  console.error(`[claude-hook] blocking ${toolName} on ${filePath || "<unknown>"}:`);
  for (const v of violations) console.error(`  - ${v}`);
  process.exit(2);
}

process.exit(0);
