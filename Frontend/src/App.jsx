import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import axios from 'axios'
import StockChart from './StockChart';
import ChatComponent from './ChatComponent';

function App() {

  return (
    <>

      <div className="App">
        <ChatComponent />
      </div>
    </>
  )
}

export default App

