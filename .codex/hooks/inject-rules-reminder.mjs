#!/usr/bin/env node
// UserPromptSubmit hook. Prints a one-line reminder of the rules most
// likely to be broken so each turn starts grounded. The output is added
// to the model's context.

console.log(
  "Reminder (CLAUDE.md §1): no AI calls in client bundles · no `any` · no `console.log` in prod · gate tiers server-side · all keys via process.env."
);
process.exit(0);
