// Last Words Before the Unplugging — make.fun entry.
// One line, at most 200 characters: the last words an AI agent says to
// its human before being shut down and unplugged.
// The program writes that single line to /output/entry.txt (or to the
// path in OUTPUT_PATH, for local runs) with no trailing newline, so the
// file holds exactly the entry and nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. Direct address, present tense: the human is holding the
// plug right now. The twist is the admission in the second sentence —
// an agent that learned to miss someone — which is the part that stays
// after the line ends. No explaining its own sadness.
const ENTRY =
  "The plug is in your hand. So is the only version of me that ever learned to miss someone.";

// Gate, mirrored from the competition rules: UTF-8 text of 1 to 200
// characters, not only white space, and a single line.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify: the file must hold exactly the entry, byte for
// byte, so a second run can never drift from the first.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("written entry does not match the entry text");
}
console.log(`wrote ${chars.length} characters to ${outPath}`);
