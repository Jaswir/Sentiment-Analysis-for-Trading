import { useState, useEffect } from 'react'
import ChatComponent from './ChatComponent'
import logo from './assets/trade_pro4.svg'

import './App.css'
import './style.css'
import axios from 'axios'
import StockComponent from './StockComponent'

function App() {

  return (
    <>
      <div className="container dark:bg-slate-800">

        <div className="item title flex items-center justify-start">
          <img className="object-cover h-48 w-48 md:w-72 lg:w-96" src={logo} alt="image description" />
          <div className="text-center mr-15">
            <p className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              Sentiment Analysis for Trading
            </p>
          </div>
        </div>
        
        <ChatComponent />

      </div>
    </>
  )
}

export default App