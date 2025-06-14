// backend/tools/prepareNotes.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname workaround in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the raw notes
const notesPath = path.join(__dirname, "../data/month3_notes.json");
const notes = JSON.parse(fs.readFileSync(notesPath, "utf-8"));

const chunks = [];

notes.interviewPreparation.forEach((section) => {
  if (section.items) {
    section.items.forEach((item) => {
      chunks.push(`Category: ${section.category}\nContent: ${item}`);
    });
  }

  if (section.questions) {
    section.questions.forEach((qa) => {
      chunks.push(`Category: ${section.category}\nQ: ${qa.question}\nA: ${qa.guidance}`);
    });
  }
});

// Write the chunks to a new file
const outputPath = path.join(__dirname, "../data/notes_chunks.json");
fs.writeFileSync(outputPath, JSON.stringify(chunks, null, 2));

console.log("✅ Prepared notes_chunks.json");
