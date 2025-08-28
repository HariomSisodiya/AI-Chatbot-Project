// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { fetchClientsByDistributorId } from "./client.controller.js";
// import { fetchCurrentAum } from "./presentDay.controller.js";

// let chatHistory = [];

// const isClientListRequest = (text) => {
//   const keywords = [
//     "client list",
//     "give me client list",
//     "show clients",
//     "list of clients",
//     "get client list",
//   ];
//   return keywords.some((keyword) => text.toLowerCase().includes(keyword));
// };

// const isCurrentAumRequest = (text) => {
//   const keywords = [
//     "current aum",
//     "total aum",
//     "get current aum",
//     "aum",
//     "show current aum",
//     "give my current aum",
//   ];
//   return keywords.some((keyword) => text.toLowerCase().includes(keyword));
// };

// export const getAIAns = async (req, res) => {
//   const { question, distributorId } = req.body;

//   if (!question) {
//     return res.status(400).json({ error: "Question is required" });
//   }

//   try {
//     // ✅ If user asks for client list
//     if (isClientListRequest(question)) {
//       // if (!distributorId) {
//       //   return res.json({
//       //     answer: "Please provide your distributorId to fetch client list.",
//       //     requireDistributorId: true
//       //   });
//       // }

//       const clients = await fetchClientsByDistributorId(distributorId);
//       return res.json({
//         answer: "Here is your client list:",
//         clients: clients,
//       });
//     }

//     if (isCurrentAumRequest(question)) {
//       const totalAUM = await fetchCurrentAum(distributorId);
//       return res.json({
//         answer: `Your current AUM.`,
//         aum: totalAUM,
//       });
//     }

//     // ✅ If it's a normal AI question
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     chatHistory.push({ role: "user", parts: [{ text: question }] });

//     const result = await model.generateContent({ contents: chatHistory });
//     const answer = result.response.text();

//     chatHistory.push({ role: "model", parts: [{ text: answer }] });

//     return res.json({ answer, history: chatHistory });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchClientsByDistributorId } from "./client.controller.js";
import { fetchCurrentAum } from "./presentDay.controller.js";
import { fetchLatestTransactions } from "./transaction.controller.js";

let chatHistory = [];

// ✅ Check if user asks for client list
const isClientListRequest = (text) => {
  const keywords = [
    "client list",
    "give me client list",
    "show clients",
    "list of clients",
    "get client list",
  ];
  return keywords.some((keyword) => text.toLowerCase().includes(keyword));
};

// ✅ Check if user asks for actual current AUM (for card)
const isCurrentAumRequest = (text) => {
  const keywords = [
    "current aum",
    "total aum",
    "get current aum",
    "my aum",
    "show current aum",
    "give my current aum",
    "show my aum",
    "mera aum",
    "show aum",
  ];
  return keywords.some((keyword) => text.toLowerCase().includes(keyword));
};

// ✅ Check if user asks for latest transactions
const isLatestTransactionRequest = (text) => {
  const keywords = [
    "latest transaction",
    "latest transactions",
    "last transaction",
    "show latest transactions",
    "show latest transaction",
    "recent transactions",
    "recent transaction",
    "my last transactions",
    "my last transaction",
    "last 10 transactions",
    "last 10 transaction",
    "recent 10 transactions",
    "recent 10 transaction",
  ];
  return keywords.some((keyword) => text.toLowerCase().includes(keyword));
};

export const getAIAns = async (req, res) => {
  try {
    const { question, distributorId } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required" });

    const lowerQuestion = question.toLowerCase();

    // ✅ Client list query
    if (isClientListRequest(lowerQuestion)) {
      const clients = await fetchClientsByDistributorId(distributorId);
      return res.json({ success: true, answer: "Here is your client list.", clients });
    }

    // ✅ Current AUM card only if not a definition question
    if (isCurrentAumRequest(lowerQuestion)) {
      const totalAUM = await fetchCurrentAum(distributorId);
      return res.json({ success: true, answer: "Your current AUM:", aum: totalAUM });
    }

     // ✅ Latest transactions query
    if (isLatestTransactionRequest(lowerQuestion)) {
      const transactions = await fetchLatestTransactions();
      return res.json({ 
        success: true, 
        answer: "Here are your latest transactions.", 
        transactions 
      });
    }

    // ✅ For all other questions, AI generates answer (including AUM explanations)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    chatHistory.push({ role: "user", parts: [{ text: question }] });

    const result = await model.generateContent({ contents: chatHistory });
    const answer = result.response.text();

    chatHistory.push({ role: "model", parts: [{ text: answer }] });

    return res.json({ answer, history: chatHistory });
  } catch (error) {
    console.error("Error in getAIAns:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
