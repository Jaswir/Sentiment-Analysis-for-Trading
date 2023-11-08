import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function ChatComponent() {
    
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm your Trading Assistant! How can i help you?",
          direction: 'incoming',
          sender: "TradePro"
        }
    ]);

    const handleSend = async (message) => {
        setMessages(oldMessages => [...oldMessages, {
            message,
            direction: 'outgoing',
            sender: "user"
        }]);

        setIsTyping(true);
        processMessageToChatGPT(message).then((reply) => {
            setIsTyping(false);
            setMessages(oldMessages => [...oldMessages, {
                message: reply,
                direction: 'incoming',
                sender: "TradePro"
            }]);
        });
    };

    async function processMessageToChatGPT(message) 
    {
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` };
        const payload = {
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": message }],
            temperature: 0.7
        };

        try
        {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
            return response.data.choices[0].message.content.trim();
        }
        catch(error)
        {
            return error.message;
        }
    }

    return (
        <>
            <div style={{ height: "100%", width: "100%" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="TradePro is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput className=".cs-message-input" placeholder="Send a message" onSend={handleSend}
                            attachButton={false} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </>
    )
}


export default ChatComponent

