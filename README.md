# 🤖 Month 3 Notes Chat Assistant

This is a simple AI-powered chat assistant built with **React** and **LangChain.js**. It allows you to ask questions about your Month 3 study notes and receive helpful, friendly responses — just like chatting with a study buddy.

---

## 🧩 Features

- 💬 Chat interface to ask questions
- 🧠 Smart retrieval from structured notes using LangChain
- 🔍 Fallback search if AI can't find a good answer
- ✨ Smooth user experience with a typing indicator
- 🧾 Uses your own notes in JSON format (no external API required)

---

## 📁 Folder Structure
project/
├── backend/
│ ├── data/
│ │ ├── month3_notes.json # Main notes file
│ │ └── notes_chunks.json # Notes broken into small chunks
│ ├── tools/
│ │ └── searchHelper.js # Fallback keyword search
│ └── langchainAgent.js # LangChain setup
├── src/
│ └── components/
│ └── ChatAssistant.jsx # React component for UI
├── public/
├── package.json
└── README.md



---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/month3-chat-assistant.git
cd month3-chat-assistant


## 2. Install Dependencies




