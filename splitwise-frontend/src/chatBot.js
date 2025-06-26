import React, { useState } from "react";
import axios from "axios";

function ChatBot({ userId }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages([...messages, newMsg]);

    try {
      const response = await axios.post("http://localhost:8000/chat", {
        user_id: userId,
        message: input,
      });

      setMessages([...messages, newMsg, { role: "bot", content: response.data.response }]);
    } catch (err) {
      setMessages([...messages, newMsg, { role: "bot", content: "Error fetching response." }]);
    }

    setInput("");
  };

  return (
    <div className="bg-white shadow rounded p-4 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-2">💬 AI Assistant</h2>
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-1 text-sm ${msg.role === "user" ? "text-blue-700" : "text-green-700"}`}>
            <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border px-2 py-1 w-full rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me something..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
