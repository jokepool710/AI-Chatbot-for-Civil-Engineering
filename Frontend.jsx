import React, { useState } from 'react';
import axios from 'axios';

function ChatApp() {
  const [messages, setMessages] = useState([]); 
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, {sender: "You", text: input}]);
    const res = await axios.post("http://localhost:5000/chat", { message: input });
    setMessages([...messages, {sender: "You", text: input}, {sender: "Bot", text: res.data.response}]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <div style={{ border: "1px solid #ccc", height: 400, overflowY: "scroll", padding: 10 }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.sender}:</strong> {m.text}</p>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        style={{ width: "80%", padding: 8 }} 
      />
      <button onClick={sendMessage} style={{ padding: 8 }}>Send</button>
    </div>
  );
}
