import notes from "../data/month3_notes.json";

// Enhanced search function
const searchNotes = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];

  notes.interviewPreparation.forEach((section) => {
    const result = {
      category: section.category,
      matches: [],
    };

    // Search in 'items'
    if (section.items) {
      section.items.forEach((item) => {
        if (item.toLowerCase().includes(lowerQuery)) {
          result.matches.push(item);
        }
      });
    }

    // Search in 'questions'
    if (section.questions) {
      section.questions.forEach((qa) => {
        if (
          qa.question.toLowerCase().includes(lowerQuery) ||
          qa.guidance.toLowerCase().includes(lowerQuery)
        ) {
          result.matches.push(`Q: ${qa.question}\nA: ${qa.guidance}`);
        }
      });
    }

    if (result.matches.length > 0) {
      results.push(result);
    }
  });

  return results;
};
export default searchNotes;