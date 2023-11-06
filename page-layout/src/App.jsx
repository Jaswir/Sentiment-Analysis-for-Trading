import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import '../style.css'
// import '../style2.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="container">
        <div class="item item-1"></div>
        <div class="item item-2"></div>
        <div class="item item-3"></div>
        <div class="item item-4"></div>
        <div class="item item-5"></div>
      </div>
    </>
  )
}

export default App
