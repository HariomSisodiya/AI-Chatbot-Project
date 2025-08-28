import { useState, useEffect, useRef } from "react";

export default function useSpeechRecognition(onResult) {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, [onResult]);

  const startListening = () => {
    if (supported && recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  return { isListening, supported, startListening, stopListening };
}
