import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './style.css'
// import '../style2.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="container">
        <div class="item title">
          <p>Sentiment Analysis for Trading</p>
        </div>
        <div class="item chat">
          <p>Chat</p>
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
