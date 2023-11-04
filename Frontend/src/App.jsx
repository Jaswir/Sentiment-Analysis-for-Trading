import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

function App() {
  const [count, setCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState([
    // {
    //   message: "Hello, I'm ChatGPT! Ask me anything!",
    //   sentTime: "just now",
    //   sender: "ChatGPT"
    // }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const messageStyle = {
    backgroundColor: 'darkred',
    color: 'darksalmon',
  };

  return (
    <>
      <div className="App">
        <div style={{ position: "relative", height: "800px", width: "700px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
              >
                {messages.map((message, i) => {
                  console.log(message)
                  return <Message key={i} model={message} />
                })}
              </MessageList>
              <MessageInput className="messageStyle" placeholder="Send a message" onSend={handleSend}
                attachButton="false" />	
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  )
}

export default App


