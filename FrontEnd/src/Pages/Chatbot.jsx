import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/card"; // Adjust path as needed
import { MessageSquare } from "lucide-react";
import Women from "./../assets/Image/Women.jpg"; // Reuse dashboard's background image

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are WoSafe-Bot, a kind, supportive, and understanding chatbot built to help women. You answer website-related queries, offer motivation, guidance, stress relief, and safety advice. Always respond in short, empathetic, and helpful sentences.",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const chatContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const apiKey = ""; // Replace with your real key

  // Scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    console.log(userInput);
    if (!userInput.trim()) return;
    setLoading(true);
    
    const newUserMessage = { role: "user", content: userInput };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    var apiKey = "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"
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://yourdomain.com",
          "X-Title": "WoSafe Chatbot",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-zero:free",
          messages: [...messages, newUserMessage],
        }),
      });

      const data = await response.json();
      console.log(data);
      const botReply = data.choices[0].message.content.replace(/^\\boxed{([\s\S]*)}$/, "$1");
      console.log(botReply);
      // console.log(JSON.parse(botReply));
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />
        <img
          src={Women || "/placeholder.svg"}
          className="w-full h-full object-cover opacity-15 mix-blend-overlay"
          alt="Background"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">WoSafe Chatbot</h1>
          <p className="text-purple-600 mt-2">Your supportive AI assistant for guidance and safety advice</p>
        </div>

        <Card className="max-w-2xl mx-auto bg-white border-none shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 p-5">
            <CardTitle className="text-white text-lg flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 opacity-80" />
              Chat with WoSafe-Bot
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div
              ref={chatContainerRef}
              className="h-[60vh] overflow-y-auto mb-4 pr-2"
            >
              {messages
                .filter((msg) => msg.role !== "system") // Exclude system prompt
                .map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } mb-3`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-pink-50 text-pink-800"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-grow p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Send
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;