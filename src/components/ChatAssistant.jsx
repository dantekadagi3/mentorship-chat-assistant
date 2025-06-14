import React, { useState } from "react";
import { runQuery } from "../../backend/langchainAgent"; // Adjust path if needed
import searchNotes from "../../backend/tools/searchHelper"; // Adjust path as needed

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Use searchHelper.js for fallback
  const fallbackSearch = (query) => {
    const results = searchNotes(query);

    if (results.length === 0) {
      return "❌ Sorry, I couldn’t find anything helpful from month 3 notes.";
    }

    return results
      .map((section) => {
        const formatted = section.matches.map((m) => `- ${m}`).join("\n");
        return `📚 ${section.category}:\n${formatted}`;
      })
      .join("\n\n");
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      let reply = await runQuery(query);

      // Fallback if no content returned
      if (!reply || reply.trim() === "") {
        reply = fallbackSearch(query);
      }

      const botMessage = { role: "bot", text: reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Langchain runQuery error:", error);
      const fallback = fallbackSearch(query);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: fallback },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4 bg-white/30 rounded-xl shadow-lg backdrop-blur-lg">
      <div className="h-96 overflow-y-auto space-y-3 px-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[75%] p-3 rounded-lg whitespace-pre-line ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-100 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-gray-500 text-sm">🤖 Typing...</div>}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask me about Month 3 notes..."
          className="flex-1 px-4 py-2 rounded-lg bg-white text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
