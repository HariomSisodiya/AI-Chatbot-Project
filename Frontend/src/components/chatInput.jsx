"use client"

export default function ChatInput({
  input,
  setInput,
  onSend,
  isListening,
  toggleListening,
  speechSupported,
  isTyping,
}) {
  return (
    <div
      className="p-4 border-top"
      style={{
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: "0 0 0.5rem 0.5rem",
      }}
    >
      <div className="d-flex gap-3 align-items-end">
        <div className="flex-grow-1 position-relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !isTyping && onSend()}
            placeholder={isListening ? "🎤 Listening..." : "Type your message..."}
            className="form-control form-control-lg border-0 shadow-sm"
            style={{
              borderRadius: "25px",
              paddingLeft: "20px",
              paddingRight: speechSupported ? "60px" : "20px",
              background: "#fff",
            }}
            disabled={isTyping || isListening}
          />

          {speechSupported && (
            <button
              className={`btn position-absolute top-50 end-0 translate-middle-y me-2 rounded-circle ${
                isListening ? "btn-danger" : "btn-outline-secondary"
              }`}
              onClick={toggleListening}
              style={{ width: "40px", height: "40px" }}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              🎤
            </button>
          )}
        </div>

        <button
          className="btn btn-lg rounded-circle shadow-sm d-flex align-items-center justify-content-center"
          onClick={onSend}
          disabled={!input.trim() || isTyping}
          style={{
            width: "56px",
            height: "56px",
            background: input.trim() && !isTyping ? "linear-gradient(135deg, #dc3545 0%, #c82333 100%)" : "#6c757d",
            border: "none",
            color: "white",
          }}
          title="Send message"
        >
          {isTyping ? (
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <span style={{ fontSize: "18px" }}>➤</span>
          )}
        </button>
      </div>
    </div>
  )
}
