"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import "./App.css";
import axios from "axios";
import ChatHeader from "./components/chatHeader";
import MessageList from "./components/messageList";
import ChatInput from "./components/chatInput";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import useTextToSpeech from "./hooks/useTextToSpeech";

export default function RedAIChatbot() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm RedAI, your intelligent assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [clients, setClients] = useState([]); // ✅ State for Client List
  const [transactions, setTransactions] = useState([]);
  const [currentAUM, setCurrentAUM] = useState("");
  const messagesEndRef = useRef(null);

  const {
    isListening,
    supported: speechSupported,
    startListening,
    stopListening,
  } = useSpeechRecognition((text) => setInput(text));
  const { supported: ttsSupported, speakingId, speak } = useTextToSpeech();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const { data } = await axios.post("http://localhost:3000/ai/getAIAns", {
        question: userMsg.text,
        history: messages,
        distributorId: "ARN1", // ✅ Later make this dynamic
      });

      const botMsg = {
        id: Date.now() + 1,
        text: data.answer || "Sorry, I couldn't fetch a response.",
        sender: "bot",
        timestamp: new Date(),
        showClients: data.showClients || false, // ✅ new
        showAUM: data.showAUM || false, // ✅ new
        showTransaction: data.showTransaction || false, // ✅ new
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.clients && Array.isArray(data.clients)) {
        setClients(data.clients);
      }

      if (data.aum) {
        setCurrentAUM(data.aum);
      }

      if (data.transactions) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Error fetching response!",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot-wrapper">
      <div className="chatbot-card">
        <ChatHeader />
        <MessageList
          messages={messages}
          ttsSupported={ttsSupported}
          speakingId={speakingId}
          onSpeak={speak}
          isTyping={isTyping}
          clients={clients}
          currentAUM={currentAUM}
          transaction={transactions}
        />
        <div ref={messagesEndRef}></div>
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          isListening={isListening}
          toggleListening={isListening ? stopListening : startListening}
          speechSupported={speechSupported}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
}
