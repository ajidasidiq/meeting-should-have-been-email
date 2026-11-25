// The Meeting That Should Have Been an Email — make.fun entry.
//
// The whole entry is one line: a joke about a meeting that should have
// been an email. The program writes that line, and nothing else, to
// /output/entry.txt. The line is a fixed constant, so every run of this
// program produces byte-identical output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The joke. One line, plain text, no setup: the turn lands on the last
// word. A shared screen scrolls straight past the email holding the
// answer, twice — and the room's response is to book another meeting
// to go looking for it again.
const ENTRY =
  "Someone shared their screen, scrolled past the email with the answer twice, and we booked a follow-up meeting to look for it again.";

// The gate allows 1 to 200 characters, a single line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0 || /\r|\n/.test(ENTRY)) {
  throw new Error("entry must be one non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read it back: the file must hold exactly the entry, no trailing
// newline, no extra bytes, so the gate sees the same 131 characters
// on every run.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("entry.txt does not match the entry exactly");
}
console.log(`wrote /output/entry.txt (${ENTRY.length} characters)`);
