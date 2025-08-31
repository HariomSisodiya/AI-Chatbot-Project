"use client";

import React from "react";
import ClientList from "./clientList";
import AumCard from "./aumCard";
import TransactionList from "./transactionList";

function MessageBubble({
  message,
  isUser,
  ttsSupported,
  speakingId,
  onSpeak,
  clients,
  currentAUM,
  transaction,
}) {
  const shouldShowClients =
    !isUser &&
    clients &&
    clients.length > 0 && message.showClients === true;

  const shouldShowAUM =
    !isUser &&
    currentAUM && message.showAUM === true;

  const shouldShowTransaction =
    !isUser &&
    transaction &&
    transaction.length > 0 &&
    message.showTransaction === true;

  return (
    <div className={`d-flex mb-4 ${isUser ? "justify-content-end" : ""}`}>
      {/* Avatar for AI */}
      {!isUser && (
        <div className="me-3 flex-shrink-0">
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
        </div>
      )}

      {/* Message Bubble */}
      <div className="d-flex flex-column" style={{ maxWidth: "85%" }}>
        <div
          className={`p-3 rounded-3 shadow-sm position-relative ${
            isUser ? "bg-primary text-white ms-auto" : "bg-light border"
          }`}
          style={{
            background: isUser
              ? "linear-gradient(135deg, #dc3545 0%, #c82333 100%)"
              : "#f8f9fa",
          }}
        >
          {/* Tail */}
          <div
            className={`position-absolute ${
              isUser
                ? "end-0 bg-primary"
                : "start-0 bg-light border-start border-bottom"
            }`}
            style={{
              width: "12px",
              height: "12px",
              bottom: "8px",
              transform: isUser
                ? "translateX(6px) rotate(45deg)"
                : "translateX(-6px) rotate(45deg)",
              background: isUser
                ? "linear-gradient(135deg, #dc3545 0%, #c82333 100%)"
                : "#f8f9fa",
            }}
          ></div>

          {/* Message Text */}
          <p className="mb-2 lh-base">{message.text}</p>

          {/* Conditional Components */}
          {shouldShowClients && <ClientList client={clients} />}
          {shouldShowAUM && <AumCard currentAum={currentAUM} />}
          {shouldShowTransaction && (
            <TransactionList transaction={transaction} />
          )}

          {/* Timestamp + TTS */}
          <div className="d-flex align-items-center justify-content-between">
            <small className={`${isUser ? "text-white-50" : "text-muted"}`}>
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>

            {!isUser && ttsSupported && (
              <button
                onClick={() => onSpeak(message.id, message.text)}
                className={`btn btn-sm rounded-circle d-flex justify-content-center align-items-center ms-2 ${
                  speakingId === message.id
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                style={{ width: "32px", height: "32px" }}
                title={speakingId === message.id ? "Stop" : "Play"}
              >
                {speakingId === message.id ? "■" : "▶"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Avatar for User */}
      {isUser && (
        <div className="ms-3 flex-shrink-0">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center shadow-sm bg-secondary"
            style={{ width: "40px", height: "40px" }}
          >
            <span className="text-white fw-bold small">U</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(MessageBubble);
