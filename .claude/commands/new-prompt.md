---
description: Scaffold a new AI prompt template with the §12 constraint block
argument-hint: <mode-name>  (e.g. oracle, love, career, compatibility)
---

Create a new prompt file at `packages/core/prompts/$1.prompt.ts`.

Hard rules (CLAUDE.md §12):
1. Export a single template string. No prose, no markdown fences around the template itself.
2. Use double-curly placeholders `{{name}}`, `{{lifePathNumber}}`, etc. — never single-curly, never `${}`.
3. Include the ABSOLUTE CONSTRAINTS block verbatim — never edit the constraints:
   - Never predict death, serious illness, financial ruin, or relationship failure.
   - Never give specific dates for future events.
   - Never make medical or legal recommendations.
   - Always frame as tendencies and energies, not certainties.
   - Use sentence case throughout (no Title Case in prose).
4. If the mode could surface distress (love rejection, health concerns, isolation), include the distress-line fallback verbatim:
   `If you are going through a difficult time, please reach out to someone you trust or contact a support line in your area.`
5. The synthesis section must explicitly cross-reference palmistry + numerology + astrology — that's the Lyra differentiator (§2). Do not write a single-system prompt.

Reference template skeleton:

```typescript
// packages/core/prompts/$1.prompt.ts
export const $1Prompt = `SYSTEM:
You are a master palmist, numerologist, and Vedic astrologer.
[mode-specific framing here]

USER CONTEXT (JSON):
{
  "name": "{{name}}",
  "lifePathNumber": {{lifePathNumber}},
  ...
}

TASK:
[mode-specific instructions, mirroring the six-phase structure from §12.2]

ABSOLUTE CONSTRAINTS:
- Never predict death, serious illness, financial ruin, or relationship failure.
- Never give specific dates for future events.
- Never make medical or legal recommendations.
- Always frame as tendencies and energies, not certainties.
- Use sentence case throughout (no Title Case in prose).
- If the user seems to be in distress, close with:
  "If you are going through a difficult time, please reach out to someone
  you trust or contact a support line in your area."
`;
```

After scaffolding, invoke the `hastara-prompt-reviewer` subagent to check the new prompt against §12 constraints.
