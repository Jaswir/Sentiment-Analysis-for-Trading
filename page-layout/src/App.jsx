import { useState } from 'react'
import ChatComponent from './ChatComponent'

import './App.css'
import './style.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="container ">

        <div class="item title flex items-center justify-center">
          <h1 class="text-center mb-4 text-3xl font-extrabold text-gray-900 
        dark:text-black md:text-5xl lg:text-6xl">Sentiment Analysis for Trading</h1>
        </div>
        <div class="item chat">
          <ChatComponent />
        </div>
        <div class="item tesla">
          <p>Tesla</p>
        </div>
        <div class="item apple">
          <p>Apple</p>
        </div>
        <div class="item google">
          <p>Google</p>
        </div>
      </div>
    </>
  )
}

export default App
