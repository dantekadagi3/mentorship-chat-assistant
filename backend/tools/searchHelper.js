// searchHelper.js
import Fuse from "fuse.js";

let cachedData = null;
let fuse = null;

const loadNotes = async () => {
  if (cachedData) return cachedData;

  const res = await fetch("/month3_notes.json");
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.warn("❗ Expected an array in month3_notes.json");
    return [];
  }

  cachedData = data;

  // ✅ Setup Fuse.js for fuzzy searching
  fuse = new Fuse(data, {
    keys: ["Content", "Q", "A", "Category"],
    threshold: 0.4, // adjust for stricter/looser matching
    includeScore: true,
  });

  return data;
};

const searchNotes = async (query) => {
  await loadNotes(); // ensure data is loaded and fuse initialized

  if (!fuse) {
    console.error("❌ Fuse instance not initialized.");
    return [];
  }

  const results = fuse.search(query).slice(0, 5); // top 5 best matches

  if (results.length === 0) return [];

  const grouped = {};

  results.forEach(({ item }) => {
    const category = item.Category || "Uncategorized";
    if (!grouped[category]) grouped[category] = [];

    if (item.Q && item.A) {
      grouped[category].push(`Q: ${item.Q}\nA: ${item.A}`);
    } else if (item.Content) {
      grouped[category].push(item.Content);
    }
  });

  return Object.entries(grouped).map(([category, matches]) => ({
    category,
    matches,
  }));
};

export default searchNotes;
