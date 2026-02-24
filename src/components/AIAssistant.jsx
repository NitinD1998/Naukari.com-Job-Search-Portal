import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import './AIAssistant.css';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hello! I am your 24/7 Ardhnarishwar Assistant. How can I help you accelerate your career today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        const newUserMessage = { id: Date.now(), sender: 'user', text: userMsg };

        setMessages(prev => [...prev, newUserMessage]);
        setInput('');

        // Simulate AI thinking and responding
        setTimeout(() => {
            const botResponse = generateResponse(userMsg);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botResponse }]);
        }, 800 + Math.random() * 1000); // Random delay between 0.8s and 1.8s
    };

    const generateResponse = (message) => {
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('job') || lowerMsg.includes('search') || lowerMsg.includes('find')) {
            return "You can search for jobs directly from our homepage! Check out the 'Featured Jobs' section or use the search bar at the top to filter by designation, location, or skills.";
        }
        if (lowerMsg.includes('post') || lowerMsg.includes('employer') || lowerMsg.includes('hire')) {
            return "Are you hiring? Great! You can post a new job listing by clicking the 'For employers' button in the navigation bar and then selecting 'Post a Job'.";
        }
        if (lowerMsg.includes('cv') || lowerMsg.includes('resume') || lowerMsg.includes('generator')) {
            return "Need a professional resume? Try our brand new 'CV Builder' located in the top navigation menu. It's free and lets you download a print-ready PDF instantly!";
        }
        if (lowerMsg.includes('register') || lowerMsg.includes('login') || lowerMsg.includes('account')) {
            return "You can create an account or log in using the buttons in the top right corner. Having an account lets you save jobs and apply faster.";
        }
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg === 'hi') {
            return "Hi there! I'm here 24/7. What's on your mind?";
        }

        return "I'm still learning, but I can help you with job searches, employer services, CV building, or account queries. Could you please rephrase your question?";
    };

    return (
        <div className="ai-assistant-wrapper">
            {/* Chatbot Window */}
            <div className={`ai-chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <div className="header-info">
                        <Bot size={22} className="bot-icon-header" />
                        <div>
                            <h4>Ardhnarishwar AI Assistant</h4>
                            <span className="online-status">Online 24/7</span>
                        </div>
                    </div>
                    <button onClick={handleToggle} className="close-btn" aria-label="Close chat">
                        <X size={20} />
                    </button>
                </div>

                <div className="chat-body">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`chat-message ${msg.sender}`}>
                            {msg.sender === 'bot' && <div className="avatar bot-avatar"><Bot size={14} /></div>}
                            <div className="message-content">
                                <p>{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && <div className="avatar user-avatar"><User size={14} /></div>}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-footer" onSubmit={handleSend}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="chat-input"
                    />
                    <button type="submit" className="send-btn" disabled={!input.trim()} aria-label="Send message">
                        <Send size={18} />
                    </button>
                </form>
            </div>

            {/* Floating Action Button */}
            {!isOpen && (
                <button onClick={handleToggle} className="ai-fab" aria-label="Open AI Assistant">
                    <div className="fab-icon-container">
                        <MessageCircle size={28} />
                        <span className="notification-dot"></span>
                    </div>
                </button>
            )}
        </div>
    );
};

export default AIAssistant;
