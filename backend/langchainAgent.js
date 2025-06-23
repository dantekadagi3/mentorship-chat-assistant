// backend/langchainAgent.js
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { FakeEmbeddings } from "langchain/embeddings/fake";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda, RunnableSequence } from "@langchain/core/runnables";

import chunks from "./data/notes_chunks.json";

let chain; // Define at the top so it's shared

// Wrap all initialization in an async function
async function initializeChain() {
  // Step 1: Embed the notes
  const vectorStore = await MemoryVectorStore.fromTexts(
    chunks,
    chunks.map((text, idx) => ({ id: idx })),
    new FakeEmbeddings()
  );

  // Step 2: Setup retriever
  const retriever = vectorStore.asRetriever();

  // Step 3: Build the combine chain manually
  const prompt = ChatPromptTemplate.fromTemplate(`
You are an interview buddy trained only on the user's month 3 learning notes.
Answer like a helpful and supportive assistant.

Context:
{context}

User Question:
{question}
  `);

  const fakeLLM = new RunnableLambda({
    func: async ({ context, question }) => ({
      answer: `🤖 Based on your notes, here's a helpful response:\n\n${context}\n\nFor your question: "${question}"`,
    }),
  });

  const combineDocsChain = RunnableSequence.from([
    prompt,
    fakeLLM,
  ]);

  // Step 4: Create full retrieval QA chain
  chain = await createRetrievalChain({
    retriever,
    combineDocsChain,
  });
}

// Run initialization right away
initializeChain().catch((err) => {
  console.error("❌ Failed to initialize LangChain agent:", err);
});

// Main query runner
export const runQuery = async (userInput) => {
  try {
    if (!chain) {
      return "⏳ Please wait — the assistant is still initializing.";
    }
    const res = await chain.invoke({ question: userInput });
    return res.answer || res.content || "🤖 Sorry, no answer found.";
  } catch (err) {
    console.error("❌ LangChain error:", err);
    return "❌ An error occurred while trying to answer your question.";
  }
};
