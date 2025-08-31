import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchClientsByDistributorId } from "./client.controller.js";
import { fetchCurrentAum } from "./presentDay.controller.js";
import { fetchLatestTransactions } from "./transaction.controller.js";
import { getPromptType } from "../prompt/prompt.js";

let chatHistory = [];

// System instruction as plain text (not system role)
const SYSTEM_INSTRUCTION =
  "You are a financial assistant. Answer only about mutual funds and related financial topics. " +
  "Give short and concise answers (max 5 sentences). " +
  "If the question is outside finance, politely say you can only help with financial queries.";

export const getAIAns = async (req, res) => {
  try {
    const { question, distributorId } = req.body;
    if (!question)
      return res.status(400).json({ error: "Question is required" });

    const intent = getPromptType(question);

    // 📌 Handle Mutual Fund specific intents
    if (intent === "clientList") {
      if (!distributorId) {
        return res.json({
          answer: "Please provide distributorId.",
          requireDistributorId: true,
        });
      }
      const clients = await fetchClientsByDistributorId(distributorId);
      if (!clients || clients.length === 0) {
        return res.json({
          success: true,
          answer: "No clients found for the given distributor.",
          clients: [],
        });
      }
      return res.json({
        success: true,
        answer: "Here is your client list.",
        clients,
      });
    }

    if (intent === "currentAum") {
      if (!distributorId) {
        return res.json({
          answer: "Please provide distributorId.",
          requireDistributorId: true,
        });
      }
      const totalAUM = await fetchCurrentAum(distributorId);
      if (!totalAUM || totalAUM === 0) {
        return res.json({
          success: true,
          answer: "No AUM data found for the given distributor.",
          aum: 0,
        });
      }
      return res.json({
        success: true,
        answer: "Your current AUM:",
        aum: totalAUM,
      });
    }

    if (intent === "latestTransaction") {
      const transactions = await fetchLatestTransactions();
      if (!transactions || transactions.length === 0) {
        return res.json({
          success: true,
          answer: "No transactions found.",
          transactions: [],
        });
      }
      return res.json({
        success: true,
        answer: "Here are your latest transactions.",
        transactions,
      });
    }

    // 📌 Default: AI generate (concise + financial only)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // ✅ safe model
      // generationConfig: { maxOutputTokens: 150 }
    });

    // Add user question with system instruction prepended
    chatHistory.push({
      role: "user",
      parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nUser: ${question}` }],
    });

    // Keep only last 20 messages to avoid overflow
    if (chatHistory.length > 20) chatHistory.shift();

    const result = await model.generateContent({ contents: chatHistory });
    let answer = result.response.text();

    // Store bot reply in history
    chatHistory.push({ role: "model", parts: [{ text: answer }] });

    return res.json({ answer, history: chatHistory });
  } catch (error) {
    console.error("Error in getAIAns:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
