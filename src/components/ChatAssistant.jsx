import React, { useState, useEffect, useRef } from "react";
import { runQuery } from "../../backend/langchainAgent";
import searchNotes from "../../backend/tools/searchHelper";

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Highlight matched search terms in fallback
  const highlight = (text, term) =>
    text.replace(new RegExp(`(${term})`, "gi"), "**$1**");

  const fallbackSearch = async (query) => {
    try {
      const results = await searchNotes(query);

      if (!Array.isArray(results) || results.length === 0) {
        return "❌ Sorry, I couldn’t find anything helpful from month 3 notes.";
      }

      return results
        .map((section) => {
          const bullets = (section.matches || [])
            .map((m) => `- ${highlight(m, query)}`)
            .join("\n");
          return `📘 ${section.category}:\n${bullets}`;
        })
        .join("\n\n");
    } catch (err) {
      console.error("❌ fallbackSearch error:", err);
      return "⚠️ An error occurred while trying to search the notes.";
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    const userMessage = { role: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const response = await runQuery(query);
      let reply = "";

      if (typeof response === "string") {
        reply = response.trim();
      } else if (response && typeof response.content === "string") {
        reply = response.content.trim();
      }

      if (!reply) {
        reply = await fallbackSearch(query);
      }

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      console.error("Langchain runQuery error:", err);
      const fallback = await fallbackSearch(query);
      setMessages((prev) => [...prev, { role: "bot", text: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 p-4 bg-white/30 rounded-xl shadow-lg backdrop-blur-lg">
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
        {loading && (
          <div className="text-gray-500 text-sm animate-pulse">🤖 Typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask me anything..."
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
