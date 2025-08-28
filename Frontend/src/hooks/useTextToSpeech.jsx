import { useState, useRef, useEffect } from "react";

export default function useTextToSpeech() {
  const [speakingId, setSpeakingId] = useState(null);
  const [supported, setSupported] = useState(false);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setSupported(true);
      speechSynthesisRef.current = window.speechSynthesis;
    }
  }, []);

  const speak = (id, text) => {
    if (!supported) return;
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
      setSpeakingId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeakingId(id);
    utterance.onend = () => setSpeakingId(null);
    speechSynthesisRef.current.speak(utterance);
  };

  return { supported, speakingId, speak };
}
