import MessageBubble from "./messageBubble"

export default function MessageList({ messages, ttsSupported, speakingId, onSpeak, isTyping, clients , currentAUM , transaction }) {
  return (
    <div
      className="p-4"
      style={{
        maxHeight: "500px",
        overflowY: "auto",
        background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
      }}
    >
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isUser={msg.sender === "user"}
          ttsSupported={ttsSupported}
          speakingId={speakingId}
          onSpeak={onSpeak}
          clients={clients} // Pass clients prop to MessageBubble
          currentAUM={currentAUM}
          transaction={transaction}
        />
      ))}
      {isTyping && (
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
            }}
          >
            <span className="text-white fw-bold small">AI</span>
          </div>
          <div className="bg-light border rounded-3 p-3 shadow-sm">
            <div className="d-flex align-items-center gap-2">
              <div
                className="spinner-grow spinner-grow-sm text-danger"
                role="status"
                style={{ width: "0.5rem", height: "0.5rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow spinner-grow-sm text-danger"
                role="status"
                style={{ width: "0.5rem", height: "0.5rem", animationDelay: "0.1s" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <div
                className="spinner-grow spinner-grow-sm text-danger"
                role="status"
                style={{ width: "0.5rem", height: "0.5rem", animationDelay: "0.2s" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <span className="text-muted small ms-2">AI is typing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
