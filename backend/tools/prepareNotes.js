// backend/tools/prepareNotes.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input: month3_notes.json
const notesPath = path.join(__dirname, "./data/month3_notes.json");
const notes = JSON.parse(fs.readFileSync(notesPath, "utf-8"));

const chunks = notes.map((item) => {
  if (item.Q && item.A) {
    return `Category: ${item.Category}\nQ: ${item.Q}\nA: ${item.A}`;
  } else {
    return `Category: ${item.Category}\nContent: ${item.Content}`;
  }
});

const outputPath = path.join(__dirname, "../data/notes_chunks.json");
fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2));

console.log("✅ notes_chunks.json has been generated from Month 3 notes.");
