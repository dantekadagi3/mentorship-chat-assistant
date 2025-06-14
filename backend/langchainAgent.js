// backend/langchainAgent.js
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { FakeEmbeddings } from "langchain/embeddings/fake";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableLambda } from "@langchain/core/runnables";
import { RunnableSequence } from "@langchain/core/runnables";

import chunks from "./data/notes_chunks.json";

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
  func: async ({ prompt }) => ({
    content: `🤖 Here's a helpful response based on your notes:\n\n${prompt}`,
  }),
});

// This is the actual chain used for document combination
const combineDocsChain = RunnableSequence.from([
  prompt,
  fakeLLM,
]);

// Step 4: Create full retrieval QA chain
const chain = await createRetrievalChain({
  retriever,
  combineDocsChain,
});

export const runQuery = async (userInput) => {
  try {
    const res = await chain.invoke({ question: userInput });
    return res.answer || res.content || "🤖 Sorry, no answer found.";
  } catch (err) {
    console.error("❌ LangChain error:", err);
    return "❌ An error occurred while trying to answer your question.";
  }
};
