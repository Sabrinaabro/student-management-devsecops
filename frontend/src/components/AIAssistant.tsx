import { useState } from "react";
import { Button, Input, Spin } from "antd";
import { CloseOutlined, SendOutlined, RobotOutlined } from "@ant-design/icons";
import { askAI } from "../api/aiApi";
import "./AIAssistant.css";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
};

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
    ).response;

    return response?.data?.message ?? "Sorry, I couldn't process your request.";
  }

  return "Sorry, I couldn't process your request.";
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Hi! 👋 I'm your Student Assistant. How can I help you?",
    },
  ]);

  const handleAskAI = async () => {
    if (!question.trim() || loading) return;

    const userMessage = question.trim();

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: userMessage,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const data = await askAI(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: data.answer || data,
        },
      ]);
    } catch (error: unknown) {
      console.error("AI request failed:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "ai",
          text: getErrorMessage(error),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAskAI();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar">
                <RobotOutlined />
              </div>

              <div>
                <div className="ai-title">Student Assistant</div>
                <div className="ai-status">
                  <span className="status-dot"></span>
                  Online
                </div>
              </div>
            </div>

            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
              className="ai-close-button"
            />
          </div>

          {/* Messages */}
          <div className="ai-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ai-message-row ${message.sender}`}
              >
                <div
                  className={`ai-message ${
                    message.sender === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="ai-message-row ai">
                <div className="ai-message bot-message ai-loading">
                  <Spin size="small" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="ai-input-container">
            <Input.TextArea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="ai-input"
            />

            <Button
              type="primary"
              shape="circle"
              icon={<SendOutlined />}
              onClick={handleAskAI}
              disabled={!question.trim() || loading}
              className="ai-send-button"
            />
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="ai-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <RobotOutlined />
        </button>
      )}
    </>
  );
};

export default AIAssistant;
